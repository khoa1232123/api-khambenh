const router = require('express').Router();
const Bacsi = require('../models/Bacsi');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const records = await Bacsi.find()
      .populate({
        path: 'khoa',
        select: ['mso', 'ten'],
      })
      .sort({ createdAt: 'desc' });
    res.status(201).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get only one
router.get('/:id', async (req, res) => {
  const query = req.query.new;
  try {
    const record = await Bacsi.findById(req.params.id);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Bacsi({
    mso: req.body.mso,
    ten: req.body.ten,
    email: req.body.email,
    sodienthoai: req.body.sodienthoai,
    diachi: req.body.diachi,
    gioitinh: req.body.gioitinh,
    avatar: req.body.avatar,
    ngaysinh: req.body.ngaysinh,
    khoa: req.body.khoa,
  });
  try {
    const record = await newRecord.save();
    console.log(record);
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updateRecord = await Bacsi.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updateRecord);
    res.status(201).json(updateRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Bacsi.findByIdAndDelete(req.params.id);
    res.status(200).send('Bạn đã xóa bác sĩ thành công!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
