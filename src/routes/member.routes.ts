import express from "express";
import {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/member.controller";

const router = express.Router();

router.get("/", getAllMembers);       
router.post("/", createMember);       
router.get("/:id", getMemberById);    
router.put("/:id", updateMember);    
router.delete("/:id", deleteMember); 

export default router;
