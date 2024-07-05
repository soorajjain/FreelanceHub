// middleware/uploads.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, uniqueSuffix + extension);
  },
});

const maxSize = 1024 * 1024 * 5; // 2mb validation

const filefilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("JPG") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("pdf")
  ) {
    cb(null, true);
  } else {
    cb(null, false, new Error("Only images and PDF files are allowed"));
  }
};

const uploads = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: filefilter,
}).fields([
  { name: "profile_image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export default uploads;
