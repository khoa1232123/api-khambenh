const mongoose = require('mongoose');

const HosobenhnhanSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    ten: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      require: true,
      unique: true,
      min: 3,
    },
    sodienthoai: {
      type: String,
      require: true,
      min: 10,
    },
    gioitinh: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    ngaysinh: {
      type: Date,
      default: '',
    },
    ngaylap: {
      type: Date,
      default: Date.now(),
    },
    hethan: {
      type: Date,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hosobenhnhan', HosobenhnhanSchema);
