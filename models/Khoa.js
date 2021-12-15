const mongoose = require('mongoose');

const KhoaSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Khoa', KhoaSchema);
