const router = require('express').Router();
const Phieuxetnghiem = require('../models/Phieuxetnghiem');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const records = await Phieuxetnghiem.find()
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
    const record = await Phieuxetnghiem.findById(req.params.id).populate(
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
    const record = await Phieuxetnghiem.find({
      hosobenhnhan: req.params.id,
    }).populate('hosobenhnhan');
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Phieuxetnghiem({
    mso: req.body.mso,
    ten: req.body.ten,
    ngay: req.body.ngay,
    ketqua: req.body.ketqua,
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
    let updateRecord = await Phieuxetnghiem.findByIdAndUpdate(
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
    console.log(updateRecord);
    res.status(201).json(updateRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Phieuxetnghiem.findByIdAndDelete(req.params.id);
    res.status(200).send('B???n ???? x??a phieu xet nghiem th??nh c??ng!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
