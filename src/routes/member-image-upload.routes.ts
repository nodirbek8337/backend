import express from "express";
import multer from "multer";
import {
  uploadMemberImage,
  getMemberImage,
  deleteMemberImage,
} from "../controllers/member-image-upload.controller";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("image"), uploadMemberImage);
router.get("/:memberId", getMemberImage);
router.delete("/:memberId", deleteMemberImage);

export default router;
