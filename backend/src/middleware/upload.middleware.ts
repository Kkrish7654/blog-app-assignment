import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif") {
    cb(new Error("File type not supported"), false);
    return;
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
