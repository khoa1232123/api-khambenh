const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhieudangkykhambenhSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    hosobenhnhan: {
      type: Schema.Types.ObjectId,
      ref: 'Hosobenhnhan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'Phieudangkykhambenh',
  PhieudangkykhambenhSchema
);
