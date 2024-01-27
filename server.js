const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 5001;

// Set up Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// API Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // File information is available in req.file
    if (req.file) {
      res.json({ message: "File uploaded successfully.", file: req.file });
    } else {
      res.status(400).send({ message: "No file uploaded." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error uploading file.", error: error.message });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler for any other request to the server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
