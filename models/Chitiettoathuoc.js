const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChitiettoathuocSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    thuoc: {
      type: Schema.Types.ObjectId,
      ref: 'Thuoc',
    },
    soluong: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chitiettoathuoc', ChitiettoathuocSchema);
