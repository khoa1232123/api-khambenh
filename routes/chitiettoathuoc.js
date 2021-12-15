const router = require('express').Router();
const Chitiettoathuoc = require('../models/Chitiettoathuoc');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const records = await Chitiettoathuoc.find()
      .populate('thuoc')
      .sort({ createdAt: 'desc' });
    res.status(201).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get only one
router.get('/:id', async (req, res) => {
  try {
    const record = await Chitiettoathuoc.findById(req.params.id).populate(
      'thuoc'
    );
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Chitiettoathuoc({
    mso: req.body.mso,
    thuoc: req.body.thuoc,
    soluong: req.body.soluong,
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
    const updateRecord = await Chitiettoathuoc.findByIdAndUpdate(
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
    await Chitiettoathuoc.findByIdAndDelete(req.params.id);
    res.status(200).send('Bạn đã xóa Chitiettoathuoc thành công!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
