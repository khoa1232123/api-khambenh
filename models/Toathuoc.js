const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToathuocSchema = new mongoose.Schema(
  {
    mso: {
      type: String,
      require: true,
      unique: true,
    },
    ngaylap: {
      type: Date,
      default: new Date(),
    },
    chitiet: [
      {
        thuoc: {
          type: Schema.Types.ObjectId,
          ref: 'Thuoc',
        },
        soluong: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Toathuoc', ToathuocSchema);
