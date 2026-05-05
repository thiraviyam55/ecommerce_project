const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📁 upload folder path
const uploadDir = path.join(__dirname, '../../uploads');

// ✅ create folder if not exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// 🎯 optional: file filter (only images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// 🚀 export upload
const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;