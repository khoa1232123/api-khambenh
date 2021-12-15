const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LephiSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    ngaydong: {
      type: Date,
      default: '',
    },
    sotien: {
      type: Number,
      default: 0,
    },
    hosobenhnhan: {
      type: Schema.Types.ObjectId,
      ref: 'Hosobenhnhan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lephi', LephiSchema);
