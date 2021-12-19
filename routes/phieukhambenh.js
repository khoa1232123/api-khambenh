const router = require('express').Router();
const Phieukhambenh = require('../models/Phieukhambenh');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const records = await Phieukhambenh.find()
      .populate({
        path: 'hosobenhnhan',
        select: ['mso', 'ten', 'gioitinh', 'email', 'sodienthoai'],
      })
      .sort({ createdAt: 'desc' });
    res.status(201).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get only one
router.get('/:id', async (req, res) => {
  try {
    const record = await Phieukhambenh.findById(req.params.id).populate(
      'hosobenhnhan'
    );
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Phieukhambenh({
    mso: req.body.mso,
    ngaygiokham: req.body.ngaygiokham,
    hosobenhnhan: req.body.hosobenhnhan,
  });
  try {
    let record = await newRecord.save();
    record = await record
      .populate({
        path: 'hosobenhnhan',
        select: ['mso', 'ten', 'gioitinh', 'email', 'sodienthoai'],
      })
      .execPopulate();
    console.log(record);
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    let updateRecord = await Phieukhambenh.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    updateRecord = await updateRecord
      .populate({
        path: 'hosobenhnhan',
        select: ['mso', 'ten', 'gioitinh', 'email', 'sodienthoai'],
      })
      .execPopulate();
    res.status(201).json(updateRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Phieukhambenh.findByIdAndDelete(req.params.id);
    res.status(200).send('Bạn đã xóa phieu kham benh thành công!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
