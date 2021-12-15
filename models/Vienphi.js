const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VienphiSchema = new mongoose.Schema(
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
      default: '',
    },
    hosobenhnhan: {
      type: Schema.Types.ObjectId,
      ref: 'Hosobenhnhan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vienphi', VienphiSchema);
