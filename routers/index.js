import { Router } from "express";
const router = Router();
// import authRoutes from './authRoute';
import userRoutes from './userRoute';

// router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;