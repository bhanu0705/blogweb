// models/post-model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  email:{type:String,required:true},
  imageUrl: { type: String,required: true }, 
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' },
  ],
});

module.exports = mongoose.model('Post', postSchema);
