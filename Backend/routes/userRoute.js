import express from "express";
import {
    loginUser,
    registerUser,
    adminLogin,
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword
} from "../controllers/userController.js";

import authUser from "../middleware/auth.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", adminLogin);

// Password Reset Routes
router.post('/forgot-password', forgotPassword)  // replaces /check-email
router.post('/reset-password', resetPassword)    // replaces /direct-reset-password

// Profile Routes
router.get("/profile", authUser, getProfile);
router.put("/profile", authUser, updateProfile);


export default router;