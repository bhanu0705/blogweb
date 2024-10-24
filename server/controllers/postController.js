// controllers/postController.js
const Post = require('../models/post-model');
const uploadOnCloudinary = require('../utils/cloudinary');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch the latest 10 posts
exports.getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Post.find().sort({ date: -1 }).limit(5);
    res.json(latestPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  let imageUrl;

  // Check if there's an uploaded file
  if (req.file) {
    const localFilePath = req.file.path;
    const uploadedImage = await uploadOnCloudinary(localFilePath);
    if (!uploadedImage) return res.status(500).json({ message: 'Failed to upload image' });
    imageUrl = uploadedImage.url;
  } else if (req.body.imageUrl) {
    // Use the image URL from Pexels if no file was uploaded
    imageUrl = req.body.imageUrl;
  } else {
    return res.status(400).json({ message: 'No image provided' });
  }

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    email: req.body.email,
    imageUrl: imageUrl
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// In controllers/postController.js
exports.getPostsByEmail = async (req, res) => {
  const { email } = req.query; // Get email from query parameters
  try {
    const posts = await Post.find({ email }); // Find posts by email
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.author = req.body.author || post.author;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Use the instance method to delete
      await Post.deleteOne({ _id: req.params.id });
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
