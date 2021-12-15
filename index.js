const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// router
// const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const hosobenhnhanRouter = require('./routes/hosobenhnhan');
const phieuxuatnhapvienRouter = require('./routes/phieuxuatnhapvien');
const vienphiRouter = require('./routes/vienphi');
const phieudangkykhambenhRouter = require('./routes/phieudangkykhambenh');
const phieuxetnghiemRouter = require('./routes/phieuxetnghiem');
const phieukhambenhRouter = require('./routes/phieukhambenh');
const benhRouter = require('./routes/benh');
const khoaRouter = require('./routes/khoa');
const bacsiRouter = require('./routes/bacsi');
const thuocRouter = require('./routes/thuoc');
// const chitiettoathuocRouter = require('./routes/chitiettoathuoc');
const toathuocRouter = require('./routes/toathuoc');
const chitietphieukhambenhRouter = require('./routes/chitietphieukhambenh');

dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection Successfully!'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, './images')));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    return res
      .status(200)
      .json({ file: req.file, message: 'File uploaded successfully.' });
  } catch (err) {
    console.log(err);
  }
});

// app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/vienphi', vienphiRouter);
app.use('/api/hosobenhnhan', hosobenhnhanRouter);
app.use('/api/phieuxuatnhapvien', phieuxuatnhapvienRouter);
app.use('/api/phieudangkykhambenh', phieudangkykhambenhRouter);
app.use('/api/phieuxetnghiem', phieuxetnghiemRouter);
app.use('/api/phieukhambenh', phieukhambenhRouter);
app.use('/api/benh', benhRouter);
app.use('/api/khoa', khoaRouter);
app.use('/api/bacsi', bacsiRouter);
app.use('/api/thuoc', thuocRouter);
// app.use('/api/chitiettoathuoc', chitiettoathuocRouter);
app.use('/api/toathuoc', toathuocRouter);
app.use('/api/chitietphieukhambenh', chitietphieukhambenhRouter);

app.listen(8800, () => {
  console.log('Backend server is running!');
});
