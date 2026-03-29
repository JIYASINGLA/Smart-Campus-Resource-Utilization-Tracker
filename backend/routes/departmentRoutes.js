import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRole("admin"), createDepartment);
router.get("/", verifyToken, getDepartments);
router.get("/:id", verifyToken, getDepartmentById);
router.put("/:id", verifyToken, authorizeRole("admin"), updateDepartment);
router.delete("/:id", verifyToken, authorizeRole("admin"), deleteDepartment);

export default router;