import express from "express";
import { getOverviews, getOverview, addOverview, editOverview, removeOverview } from "../controllers/overview.controller";

const router = express.Router();

router.get("/", getOverviews);
router.get("/:id", getOverview);
router.post("/", addOverview);
router.put("/:id", editOverview);
router.delete("/:id", removeOverview);

export default router;
