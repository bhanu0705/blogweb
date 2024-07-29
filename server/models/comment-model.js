// models/comment-model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);