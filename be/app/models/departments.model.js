const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  department: {
    type: String,
    required: true,
  },
  majors: [
    {
      name: {
        type: String,
        required: true,
      },
      subjects: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
