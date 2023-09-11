const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require('multer');
const path = require('path');

dotenv.config();
app.use(cors());

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

app.use('/images', express.static(path.join(__dirname, 'public/images'))); //indicate the folder you want your post to save on your pc

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '_' + file.originalname;
    cb(null, uniqueFilename); //this means we are going to send this name into our react app
  },
});

const upload = multer({ storage }); //after installing multer, write this(create multer)

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('file uploaded successfully');
  } catch (err) {
    console.log(err);
  }
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(8800, () => {
  //specified any specific port
  console.log('backend server is running!!!!!!!!!!!!');
});

connectToMongoDB();
