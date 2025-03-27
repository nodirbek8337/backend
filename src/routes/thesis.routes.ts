import express from "express";
import {
  getAllTheses,
  createThesis,
  getThesisById,
  updateThesis,
  deleteThesis,
} from "../controllers/thesis.controller";

const router = express.Router();

router.get("/", getAllTheses);
router.post("/", createThesis);
router.get("/:id", getThesisById);
router.put("/:id", updateThesis);
router.delete("/:id", deleteThesis);

export default router;