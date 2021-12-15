const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhieukhambenhSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    ngaygiokham: {
      type: Date,
      default: '',
    },
    hosobenhnhan: {
      type: Schema.Types.ObjectId,
      ref: 'Hosobenhnhan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Phieukhambenh', PhieukhambenhSchema);
