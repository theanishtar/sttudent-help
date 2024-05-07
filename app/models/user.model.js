const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  student_id: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  admission_course: {
    type: String,
    required: true,
  },
  enrollment_course: {
    type: String,
    required: true,
  },
  major_code: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    enum: ['Student', 'Teacher', 'Admin'],
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  state: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  users_following: [{
    type: String, 
  }],
  topics_subscribing: [{
    type: String,
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;