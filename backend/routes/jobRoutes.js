import express from "express";
import {
  createJob,
  getJobs,
  applyJob,
  getMyApplications,
  getApplicants,
  deleteJob,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getJobs);

/* ================= USER ================= */
router.post("/apply/:id", protect, applyJob);
router.get("/my", protect, getMyApplications);

/* ================= ADMIN ================= */
router.post("/", protect, adminOnly, createJob);
router.get("/applicants/:id", protect, adminOnly, getApplicants);
router.delete("/:id", protect, adminOnly, deleteJob);

export default router;