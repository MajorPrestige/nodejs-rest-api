const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

// upload.single("NAME") - //* one file
// upload.array("NAME",  8) - //* 8 files
// upload.fileds([{
//  name: "NAME"
//  maxCount: 100
// }]) -  //* can create more fields

module.exports = upload;
