import express from "express";
import {
    createProperty,
    getApprovedProperties,
    approveProperty,
} from "../controllers/propertyController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProperty);
router.get("/", getApprovedProperties);
router.put("/:id/approve", protect, adminOnly, approveProperty);

export default router;
