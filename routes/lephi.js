const router = require('express').Router();
const Lephi = require('../models/Lephi');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  try {
    const records = await Lephi.find()
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
router.get('/bybenhnhan/:id', async (req, res) => {
  try {
    const record = await Lephi.find({ hosobenhnhan: req.params.id }).populate(
      'hosobenhnhan'
    );
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by benhnhan
router.get('/bybenhnhan/:id', async (req, res) => {
  try {
    const record = await Lephi.findOne({
      hosobenhnhan: req.params.id,
    }).populate('hosobenhnhan');
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Lephi({
    mso: req.body.mso,
    ngaydong: req.body.ngaydong,
    sotien: req.body.sotien,
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
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    let updateRecord = await Lephi.findByIdAndUpdate(
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
    await Lephi.findByIdAndDelete(req.params.id);
    res.status(200).send('Bạn đã xóa Phieu xuat nhap vien thành công!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
