const Comment = require('../models/comment-model');
const Post = require('../models/post-model');

exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { username, comment,email } = req.body;

    const newComment = new Comment({ username, comment, email });
    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({comment : newComment,  newPost: post});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const  postId  = req.params.postId;
    console.log('params: ',req.params)
    const post = await Post.findById(postId).populate('comments');
    // res.json(post.comments);
    res.json(post.comments);
} catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    // Check if comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Here you might want to add a check for user permissions

    // Use findOneAndUpdate to atomically update the post and remove the comment
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the comment' });
  }
};