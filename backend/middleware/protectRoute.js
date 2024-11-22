import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {

    const token = req.cookies['jwt-netflix'];
        
    if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized -No Token Provided"});
        }

    try {
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET); 

        if (!decoded) {
            return res.status(401).json({success: false, message: 'Unauthorized -Invalid Token'});
        }

        const user = await User.findById(decoded.userId).select("-password"); //password fieldunu getirmemek için -password yazdık

        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        // Email doğrulama kontrolü
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Email doğrulaması gerekli',
                requiresVerification: true,
                email: user.email
            });
        }

        req.user = user; 

        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware: " + error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};
