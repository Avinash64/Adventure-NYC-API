const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const validate = require("../verify/validtoken");
const spawn = require("child_process").spawn;

const multer = require("multer");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    var newposts = [];
    posts.forEach((element) => {
      console.log(User.findById(element.postedById).isPrivate);
      if (User.findById(element.postedById).isPrivate != true) {
        newposts.push(element);
      }
    });
    res.json(newposts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/userid/:userid", getUserPosts, (req, res) => {
  res.send(res.post);
});

router.get("/username/:userid", getUsernamePosts, (req, res) => {
  res.send(res.post);
});

router.get("/place/:placeid", getPlacePosts, (req, res) => {
  res.send(res.post);
});

router.get("/friends", validate, async (req, res) => {
  try {
    const posts = await Post.find({
      postedById: { $in: res.locals.user.friends },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Post
router.get("/:id", getPost, (req, res) => {
  res.send(res.post);
});

router.post("/", validate, async (req, res) => {
  const { user } = res.locals;
  const { id } = res.locals;
  console.log(user);
  console.log(id);
  console.log(req.user);
  const placeid = req.body.placeid;
  const postedBy = user.username;
  const postedById = id;
  const bio = req.body.bio;
  const background = req.body.background;
  const photo = req.body.photo;
  const signature = req.body.signature;

  const post = new Post({
    placeid,
    postedBy,
    postedById,
    bio,
    background,
    photo,
    signature,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
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

router.post("/upload", validate, upload.single("photo"), (req, res) => {
  console.log("file", req.file);
  console.log("body", req.body);
  const { user } = res.locals;
  const { id } = res.locals;
  // console.log(user);
  console.log(id);
  console.log(req.user);
  const placeid = req.body.placeid;
  const postedBy = user.username;
  const postedById = id;
  const bio = req.body.bio;
  const background = req.body.background;
  const signature = req.body.signature;
  // res.status(200).json({
  //   message: "success!",
  // });
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

    const post = new Post({
      placeid,
      postedBy,
      postedById,
      bio,
      background,
      photo,
      signature,
    });
    try {
      const newPost = post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

async function getUserPosts(req, res, next) {
  let post;
  console.log(req.params.userid);
  try {
    post = await Post.find({ postedById: req.params.userid2 });
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

async function getUsernamePosts(req, res, next) {
  let post;
  try {
    post = await Post.find({ postedById: req.params.userid });
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

async function getUsernamePosts(req, res, next) {
  let post;
  try {
    post = await Post.find({ postedBy: req.params.userid });
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

async function getPlacePosts(req, res, next) {
  let post;
  try {
    post = await Post.find({ placeid: req.params.placeid });
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

module.exports = router;
