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

// backend/controllers/userController.js
// ONLY the forgotPassword function changes — everything else stays exactly the same

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

        // ── BEAUTIFUL EMAIL TEMPLATE ──────────────────────────────
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          <div style="max-width:520px;margin:0 auto;padding:32px 16px;">

            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:22px;font-weight:700;letter-spacing:-0.5px;color:#1a1a2e;">ZIVARA</span>
            </div>

            <div style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

              <div style="background:#1a1a2e;padding:32px 40px;text-align:center;">
                <div style="width:52px;height:52px;background:#534AB7;border-radius:13px;margin:0 auto 14px;display:inline-flex;align-items:center;justify-content:center;">
                  <span style="font-size:22px;">🔒</span>
                </div>
                <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.3px;">Reset your password</p>
                <p style="margin:8px 0 0;font-size:13px;color:#9F9BC8;">This link expires in 15 minutes</p>
              </div>

              <div style="padding:36px 40px;">

                <p style="margin:0 0 6px;font-size:15px;font-weight:500;color:#111827;">Hi ${user.name},</p>
                <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.7;">
                  We received a request to reset the password for your Zivara account associated with
                  <span style="color:#534AB7;font-weight:500;">${user.email}</span>.
                  If you did not make this request, you can safely ignore this email — your password will not change.
                </p>

                <div style="text-align:center;margin:28px 0;">
                  <a href="${resetLink}"
                    style="display:inline-block;background:#1a1a2e;color:#ffffff;text-decoration:none;
                    font-size:14px;font-weight:600;padding:14px 40px;border-radius:12px;letter-spacing:0.2px;">
                    Reset my password
                  </a>
                </div>

                <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
                  Button not working? Copy and paste this link into your browser:
                </p>
                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:10px 14px;word-break:break-all;">
                  <a href="${resetLink}" style="font-family:monospace;font-size:11px;color:#534AB7;text-decoration:none;">${resetLink}</a>
                </div>

                <div style="margin:24px 0 0;border-top:1px solid #f3f4f6;padding-top:20px;">
                  <div style="background:#FEF3C7;border-radius:10px;padding:14px 16px;margin-bottom:12px;">
                    <p style="margin:0 0 3px;font-size:12px;font-weight:600;color:#92400E;">Security notice</p>
                    <p style="margin:0;font-size:12px;color:#78350F;line-height:1.6;">
                      This link expires in <strong>15 minutes</strong> and can only be used once.
                      Never share this link with anyone. Zivara will never ask for your password.
                    </p>
                  </div>

                  <div style="background:#EEEDFE;border-radius:10px;padding:14px 16px;">
                    <p style="margin:0 0 3px;font-size:12px;font-weight:600;color:#3C3489;">Didn't request this?</p>
                    <p style="margin:0;font-size:12px;color:#534AB7;line-height:1.6;">
                      Your account is completely safe. Someone may have entered your email by mistake.
                      No action is needed from your side.
                    </p>
                  </div>
                </div>

              </div>

              <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
                <p style="margin:0 0 5px;font-size:12px;color:#9ca3af;">
                  Need help? Email us at
                  <a href="mailto:support@zivara.com" style="color:#534AB7;text-decoration:none;">support@zivara.com</a>
                </p>
                <p style="margin:0;font-size:11px;color:#d1d5db;">© 2025 Zivara · Bhubaneswar, Odisha · All rights reserved</p>
              </div>

            </div>

            <p style="text-align:center;margin:16px 0 0;font-size:11px;color:#9ca3af;">
              You received this email because a password reset was requested for your account.<br/>
              If this wasn't you, no action is needed.
            </p>

          </div>
        </body>
        </html>`

        await transporter.sendMail({
            from: `"Zivara" <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: 'Reset your Zivara password',
            html: htmlContent,
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