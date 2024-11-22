import express from 'express';
import { signup, login, logout, authCheck, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();

router.get('/authCheck', protectRoute,  authCheck);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);


export default router;