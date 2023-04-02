const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const spawn = require("child_process").spawn;

const multer = require("multer");

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
router.get("/pfp/:id", getUser, (req, res) => {
  res.send(res.user.pfp);
});

router.get("/username/:username", getUsername, (req, res) => {
  res.send(res.user);
});

router.patch("/:id/add-xp", getUser, async (req, res) => {
  const xpToAdd = req.body.xp;
  res.user.xp += xpToAdd;
  try {
    const updatedUser = await res.user.save();
    res.json({ message: "XP added successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User
router.get("/search/:text", searchUsers, (req, res) => {
  let { _id, username, xp, posts, friends, profilePrivacy } = res.user;
  var user = {
    _id: _id,
    username: username,
    xp: xp,
    posts: posts,
    friends: friends,
    profilePrivacy: profilePrivacy,
  };
  console.log(res.user);
  console.log(user);
  res.send(user);
});

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./testPosts/");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/pfp/:id",
  validate,
  getUser,
  upload.single("photo"),
  (req, res) => {
    console.log("file", req.file);
    console.log("body", req.body);

    console.log(
      "python3" +
        " ImageHandling/imageupload.py " +
        `testPosts/${req.file.filename}`
    );
    const pythonProcess = spawn("python3", [
      "ImageHandling/imageupload.py",
      `testPosts/${req.file.filename}`,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      // Do something with the data returned from python script
      console.log(data.toString("utf8"));
      let link = data.toString("utf8").substring(43);
      link = link.substring(0, link.length - 1);
      console.log(link);
      const photo = link;
      res.user.pfp = link;

      try {
        const updatedUser = res.user.save();
        res.json(updatedUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }
);

// Get User
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// Create User
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

async function searchUsers(req, res, next) {
  let user;
  console.log(req.params.text);
  try {
    user = await User.findOne({ username: req.params.text }).lean();
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

router.patch("/:id/update-privacy", getUser, async (req, res) => {
  const newPrivacyStatus = req.body.isPrivate;

  res.user.isPrivate = newPrivacyStatus;

  try {
    const updatedUser = await res.user.save();
    res.json({
      message: "Profile privacy status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getUsername(req, res, next) {
  let user;
  try {
    user = await User.find({ username: req.params.username }, [
      "username",
      "_id",
      "pfp",
    ]);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
