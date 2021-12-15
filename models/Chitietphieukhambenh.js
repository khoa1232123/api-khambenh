const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChitietphieukhambenhSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    toathuoc: {
      type: Schema.Types.ObjectId,
      ref: 'Toathuoc',
    },
    bacsi: {
      type: Schema.Types.ObjectId,
      ref: 'Bacsi',
    },
    chitiet: [
      {
        benh: {
          type: Schema.Types.ObjectId,
          ref: 'Benh',
        },
      },
    ],
    trieuchung: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'Chitietphieukhambenh',
  ChitietphieukhambenhSchema
);
