const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  email: {
    type: String,
    required: true,
  },
  comment_content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  rating: {
    type: Array,
    required: false,
  }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;