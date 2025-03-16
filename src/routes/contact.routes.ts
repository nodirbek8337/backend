import express from "express";
import {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";

const router = express.Router();

router.get("/", getAllContacts);         
router.post("/", createContact);         
router.get("/:id", getContactById);    
router.put("/:id", updateContact);     
router.delete("/:id", deleteContact);  

export default router;
