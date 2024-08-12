import { User } from "../models/user.model.js";

import bcryptjs from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
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

        const salt = await bcryptjs.genSalt(10); // burada 10, hash oluştururken kullanılacak olan salt'ın büyüklüğüdür
        const hashedPassword = await bcryptjs.hash(password, salt); // password'ü hash'leme işlemi

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png",];
        
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image
        });

        
        generateTokenAndSetCookie(newUser._id, res); // token oluşturulur ve cookie'ye set edilir
        await newUser.save();
        // cevap dönerken password alanını göndermek istemiyoruz
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc, // _doc bir mongoose özelliğidir ve bu özellik ile dökümanın içindeki tüm alanlara erişebiliriz
                password: ""
            },
        });
        
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({success: false, message: 'Lütfen tüm alanları doldurunuz'});
        }

        const user = await User.findOne({ email:email });

        if (!user) {
            return res.status(404).json({success: false, message: 'Geçersiz kimlik bilgileri'});
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({success: false, message: 'Geçersiz kimlik bilgileri'});
        }

        generateTokenAndSetCookie(user._id, res); // token oluşturulur ve cookie'ye set edilir
        // cevap dönerken password alanını göndermek istemiyoruz
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            },
        });
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflix');
        res.status(200).json({success: true, message: "Çıkış yapıldı"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function authCheck(req, res) { // protectRoute middleware'den gelen req objesine user alanını ekleyen controller
    try {
        res.status(200).json({success: true, user: req.user});
    } catch (error) {
        console.log("Error in authCheck controller",error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}
