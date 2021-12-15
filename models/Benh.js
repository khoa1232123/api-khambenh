const mongoose = require('mongoose');

const BenhSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Benh', BenhSchema);
