import express from "express";
import { loginUser, registerUser, adminLogin, getProfile, updateProfile } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", adminLogin);

// Profile Routes
router.get("/profile", authUser, getProfile);
router.put("/profile", authUser, updateProfile);

export default router;