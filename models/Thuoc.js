const mongoose = require('mongoose');

const ThuocSchema = new mongoose.Schema(
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
    huongdansudung: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Thuoc', ThuocSchema);
