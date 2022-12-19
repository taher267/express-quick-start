const router = require('express').Router();
// import authRoutes from './authRoute';
const userRoutes = require('./userRoute');

// router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
