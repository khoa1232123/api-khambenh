const router = require('express').Router();
const Toathuoc = require('../models/Toathuoc');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

// Get all
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const records = await Toathuoc.find()
      .populate('chitiet.thuoc')
      .sort({ createdAt: 'desc' });
    res.status(201).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get only one
router.get('/:id', async (req, res) => {
  try {
    const record = await Toathuoc.findById(req.params.id).populate(
      'chitiet.thuoc'
    );
    console.log(record);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  const newRecord = new Toathuoc({
    mso: req.body.mso,
    ngaylap: req.body.ngaylap,
    chitiet: req.body.chitiet,
  });
  try {
    let record = await newRecord.save();
    record = await record.populate('chitiet.thuoc').execPopulate();
    console.log(record);
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    let updateRecord = await Toathuoc.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    updateRecord = await updateRecord.populate('chitiet.thuoc').execPopulate();
    console.log(updateRecord);
    res.status(201).json(updateRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Toathuoc.findByIdAndDelete(req.params.id);
    res.status(200).send('Bạn đã xóa Toathuoc thành công!!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
