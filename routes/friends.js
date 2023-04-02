const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("dotenv").config();
const validate = require("../verify/validtoken");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User
router.get("/requests/:id", getUser, async (req, res) => {
  const users = await User.find({ _id: { $in: res.user.friendRequests } }, [
    "username",
    "_id",
    "pfp",
  ]);

  console.log(users);
  console.log(res.user.username, res.user.friendRequests);
  res.json(users);
});

router.get("/friends/:id", getUser, async (req, res) => {
  const users = await User.find({ _id: { $in: res.user.friends } }, [
    "username",
    "_id",
    "pfp",
  ]);

  console.log(users);
  console.log(res.user.username, res.user.friends);
  res.json(users);
});

router.post("/request", validate, getUser, async (req, res) => {
  const { user } = res.locals;
  const { id } = res.locals;
  const friendUser = await User.findById(req.body.friend);
  console.log(user);
  console.log(id);
  console.log(req.body.friend);
  console.log(user.friends);
  console.log(friendUser);
  friendUser.friendRequests.push(user._id);
  console.log(user.friends);

  try {
    await friendUser.save();
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Update User
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User
router.delete("/", validate, getUser, async (req, res) => {
  const { user } = res.locals;
  const { id } = res.locals;
  console.log(user);
  console.log(id);
  console.log(req.body.friend);
  console.log(user.friends);
  let ind = user.friends.indexOf(req.body.friend);
  if (ind >= 0) {
    user.friends.pop(ind);
  }

  console.log(user.friends);

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      user = res.locals.user;
    }
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

router.post("/:id", validate, getUser, async (req, res) => {
  const { user } = res.locals;
  const { id } = res.locals;
  console.log(user);
  console.log(id);
  console.log(req.body.friend);
  console.log(user.friends);
  console.log(req.body.friend);
  console.log(req.body.accept);
  if (req.body.accept && user.friendRequests.includes(req.body.friend)) {
    const friendUser = await User.findById(req.body.friend);
    const userIndex = user.friendRequests.indexOf(req.body.friend);
    const friendIndex = friendUser.friendRequests.indexOf(user._id);
    console.log(user._id);
    user.friends.push(req.body.friend);
    user.friendRequests.splice(userIndex, 1);
    friendUser.friends.push(user._id);
    friendUser.friendRequests.splice(friendIndex, 1);

    await user.save();
    await friendUser.save();
  }

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
