import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// ================= HELPERS =================
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password too short" });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= ADMIN LOGIN =================
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
    try {
        const { name, dob, phone } = req.body;

        const updatedUser = await userModel
            .findByIdAndUpdate(req.body.userId, { name, dob, phone }, { new: true })
            .select("-password");

        res.json({ success: true, user: updatedUser });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const SAME_RESPONSE = {
            success: true,
            message: "If this email is registered, you'll receive a reset link shortly."
        };

        const user = await userModel.findOne({ email });
        if (!user) return res.json(SAME_RESPONSE);

        const token = crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <h2>Password Reset</h2>
                <p>Click below to reset your password</p>
                <a href="${resetLink}">Reset Password</a>
                <p>This link expires in 15 minutes</p>
            `
        });

        res.json(SAME_RESPONSE);

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token) {
            return res.json({ success: false, message: "Invalid token" });
        }

        if (!password || password.length < 6) {
            return res.json({ success: false, message: "Password too short" });
        }

        const user = await userModel.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ success: false, message: "Token expired or invalid" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({ success: true, message: "Password reset successful" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ================= EXPORT =================
export {
    loginUser,
    registerUser,
    adminLogin,
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword
};