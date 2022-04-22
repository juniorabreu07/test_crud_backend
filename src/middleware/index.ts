
import { verifyToken } from "./authJwt";
import checkDuplicateUsernameOrEmail from "./verifySigUp";
import { upload } from "./upload-middleware";
export default {
  verifyToken,
  upload,
  checkDuplicateUsernameOrEmail
};