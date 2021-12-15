const router = require('express').Router();
const Chitietphieukhambenh = require('../models/Chitietphieukhambenh');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const records = await Chitietphieukhambenh.find()
      .populate({
        path: 'toathuoc',
        populate: { path: 'chitiet.thuoc', select: ['mso', 'ten'] },
      })
      .populate({
        path: 'bacsi',
        select: ['ten', 'mso', 'khoa'],
        populate: { path: 'khoa', select: ['mso', 'ten'] },
      })
      .populate({ path: 'chitiet.benh', select: ['mso', 'ten'] })
      .sort({ createdAt: 'desc' });
    res.status(201).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get only one
router.get('/:id', async (req, res) => {
  try {
    const record = await Chitietphieukhambenh.findById(req.params.id)
      .populate({
        path: 'toathuoc',
        populate: { path: 'chitiet.thuoc', select: ['mso', 'ten'] },
      })
      .populate({ path: 'bacsi', select: ['ten', 'mso'] })
      .populate('chitiet.benh');
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Chitietphieukhambenh({
    mso: req.body.mso,
    toathuoc: req.body.toathuoc,
    bacsi: req.body.bacsi,
    chitiet: req.body.chitiet,
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
    const updateRecord = await Chitietphieukhambenh.findByIdAndUpdate(
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
    await Chitietphieukhambenh.findByIdAndDelete(req.params.id);
    res.status(200).send('Bạn đã xóa Chitietphieukhambenh thành công!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
