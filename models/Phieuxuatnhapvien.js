const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhieuxuatnhapvienSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    ngayNhap: {
      type: Date,
      default: '',
    },
    ngayXuat: {
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

module.exports = mongoose.model('Phieuxuatnhapvien', PhieuxuatnhapvienSchema);
