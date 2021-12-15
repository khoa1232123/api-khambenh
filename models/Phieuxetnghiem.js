const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhieuxetnghiemSchema = new mongoose.Schema(
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
    ngay: {
      type: Date,
      default: '',
    },
    ketqua: {
      type: String,
      default: '',
    },
    hosobenhnhan: {
      type: Schema.Types.ObjectId,
      ref: 'Hosobenhnhan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Phieuxetnghiem', PhieuxetnghiemSchema);
