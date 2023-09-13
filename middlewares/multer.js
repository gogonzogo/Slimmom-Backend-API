const multer = require('multer');
const path = require('path');
const avatarUploads = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarUploads);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    filesize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;