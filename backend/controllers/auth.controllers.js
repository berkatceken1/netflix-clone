import { User } from "../models/user.model.js";

import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { sendResetPasswordEmail, sendResetPasswordSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, repassword } = req.body;

        if (!username || !email || !password || !repassword) {
            return res.status(400).json({success: false, message: 'Lütfen tüm alanları doldurunuz'});
        }

        if (password !== repassword) {
            return res.status(400).json({success: false, message: 'Şifreler eşleşmiyor'});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: 'Geçersiz email adresi'});
        }

        if (password.length < 6) {
            return res.status(400).json({success: false, message: 'Şifre en az 6 karakter olmalıdır'});
        }

        const existingUserByEmail = await User.findOne({ email:email });

        if (existingUserByEmail) {
            return res.status(400).json({success: false, message: 'Bu email adresi ile kayıtlı kullanıcı zaten var'});
        }

        const existingUserByUsername = await User.findOne({ username:username });

        if (existingUserByUsername) {
            return res.status(400).json({success: false, message: 'Bu kullanıcı adı ile kayıtlı kullanıcı zaten var'});
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // password'ü hash'leme işlemi

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png",];
        
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika geçerli

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            image,
            verificationToken,
            verificationTokenExpiresAt
        });


        await sendVerificationEmail(email, verificationToken);
        
        // generateTokenAndSetCookie(res, user._id); // Token oluştur ama isVerified false olduğu için tam yetki verme


        res.status(201).json({
            success: true,
            message: "Kayıt başarılı! Lütfen email adresinizi doğrulayın.",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: false
            }
        });
        
    } catch (error) {
        console.log("Error in signup controller ", error.message)
        res.status(400).json({success: false, message: error.message});
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { code, email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({success: false, message: "Kullanıcı bulunamadı"});
        }

        if (user.verificationToken !== code) {
            return res.status(400).json({success: false, message: "Doğrulama kodu hatalı"});
        }

        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({success: false, message: "Doğrulama kodu süresi dolmuş"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.username);

        // generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success: true,
            message: "E-posta başarıyla doğrulandı"
        });
    } catch (error) {
        console.log("Error in verifyEmail controller ",error.message);
        res.status(500).json({success: false, message: "Email doğrulama hatası"});
    }
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({success: false, message: 'Lütfen tüm alanları doldurunuz'});
        }

        const user = await User.findOne({ email });

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

         if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Geçersiz email veya şifre"
            });
        }

        // Email doğrulama kontrolü
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Lütfen email adresinizi doğrulayın",
                requiresVerification: true,
                email: user.email
            });
        }
        
        generateTokenAndSetCookie(res, user._id); // token oluşturulur ve cookie'ye set edilir

        user.lastLogin = new Date();

        // cevap dönerken password alanını göndermek istemiyoruz
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt-netflix');
        res.status(200).json({success: true, message: "Çıkış yapıldı"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(400).json({success: false, message: error.message});
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({success: false, message: 'Kullanıcı bulunamadı'});
        }

        // şifre sıfırlama token oluşturulur
        const resetToken = crypto.randomBytes(20).toString('hex'); // 20 byte uzunluğunda rastgele bir token oluşturulur
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 saat sonra geçersiz hale gelir

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // şifre sıfırlama emaili gönderilir
        await sendResetPasswordEmail(user.email, `http://localhost:5000/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi"});
        
    } catch (error) {
        console.log("Error in forgotPassword controller",error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }, 
        });

        if (!user) {
            return res.status(400).json({success: false, message: 'Geçersiz şifre sıfırlama tokeni'});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetPasswordSuccessEmail(user.email);

        res.status(200).json({success: true, message: "Şifre başarıyla güncellendi"});
        
    } catch (error) {
        console.log("Error in resetPassword controller",error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const authCheck = async (req, res) => {
    try {
        // req.user ile kullanıcı bilgilerini kullan
        if (!req.user) {
            return res.status(400).json({ success: false, message: "Kullanıcı bulunamadı" });
        }

        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("Error in authCheck controller", error);
        res.status(400).json({ success: false, message: error.message });
    }
};