const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BacsiSchema = new mongoose.Schema(
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
      default: '',
    },
    diachi: {
      type: String,
      default: '',
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
    khoa: {
      type: Schema.Types.ObjectId,
      ref: 'Khoa',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bacsi', BacsiSchema);
