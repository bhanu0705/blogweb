const multer = require('multer');
const path = require('path');

// Define storage settings for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for the uploaded files
    cb(null, path.join(__dirname, '../temp-uploads/'));
  },
  filename: function (req, file, cb) {
    // Create a unique suffix for the filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Set the filename with the original file's field name and the unique suffix
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Set up Multer with the storage settings
const upload = multer({ storage: storage });
// Export the upload middleware for use in other parts of the application
module.exports = upload;
