import express from "express";
import {
  getAllProfessors,
  createProfessor,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
} from "../controllers/professor.controller";

const router = express.Router();

router.get("/", getAllProfessors);       
router.post("/", createProfessor);       
router.get("/:id", getProfessorById);    
router.put("/:id", updateProfessor);    
router.delete("/:id", deleteProfessor); 

export default router;
