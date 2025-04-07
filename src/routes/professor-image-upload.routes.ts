import express from "express";
import multer from "multer";
import {
  uploadProfessorImage,
  getProfessorImage,
  deleteProfessorImage,
} from "../controllers/professor-image-upload.controller";

const router = express.Router();
const upload = multer(); 

router.post("/upload", upload.single("image"), uploadProfessorImage);
router.get("/:professorId", getProfessorImage);
router.delete("/:professorId", deleteProfessorImage);

export default router;
