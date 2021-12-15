const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      require: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    avatar: {
      type: String,
      default: '',
    },
    birth: {
      type: Date,
      default: Date.now(),
    },
    gender: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: 'Guest',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
