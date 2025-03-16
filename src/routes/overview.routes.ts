import express from "express";
import {
  getAllOverviews,
  createOverview,
  getOverviewById,
  updateOverview,
  deleteOverview,
} from "../controllers/overview.controller";

const router = express.Router();

router.get("/", getAllOverviews);        
router.post("/", createOverview);       
router.get("/:id", getOverviewById);    
router.put("/:id", updateOverview);    
router.delete("/:id", deleteOverview);  

export default router;
