import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

    res.cookie('jwt-netflix', token, {
        httpOnly: true, // sadece sunucu tarafından okunabilir, xss saldırılarına karşı koruma sağlar
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 gün süresince geçerli olacak
        samesite: "strict", // sadece aynı siteye yapılan isteklerde cookie gönderilir, CSRF saldırılarına karşı koruma sağlar
        secure: ENV_VARS.NODE_ENV !== "development", // sadece https üzerinden gönderilecek

    });

    return token;
};

