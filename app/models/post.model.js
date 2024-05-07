const mongoose = require('mongoose');
const Comment = require('./comment.model');

const postSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Number,
    required: true,
  },
  likes: {
    type: Array,
    required: false,
  },
  views: {
    type: Number,
    required: true,
  },
  comments: [Comment.schema],
  is_active: {
    type: Boolean,
    required: true,
  },
  inappropriate_content_reports: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    default: true,
  },
  reason: {
    type: String,
    required: false,
  }
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;