const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Resolve the uploads directory relative to the backend folder.
const uploadDir = path.resolve(__dirname, "../../uploads");

// Create the directory if it doesn't exist.
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }

    cb(null, true);
  },
});

module.exports = upload;