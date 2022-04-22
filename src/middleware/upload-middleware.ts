import multer from "multer";
import path from "path";
import { v4 as uuid } from 'uuid';
import fs from "fs";
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (! await fs.existsSync(path.join(__dirname, `../../${process.env.PATH_FOLDER_PUBLIC}`))) {
      await fs.mkdirSync(path.join(__dirname, `../../${process.env.PATH_FOLDER_PUBLIC}`));
      await fs.mkdirSync(path.join(__dirname, `../../${process.env.PATH_FOLDER_PUBLIC}/images`));
    }
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