import multer from "multer";
import path from "path";
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.env.PATH_FOLDER_PUBLIC}/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  }
});
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024
  }
});