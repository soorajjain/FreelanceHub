// routes/userRoutes.js
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controller/userController.js'

const router = express.Router();

router.get('/:id', getUserProfile); // Route to get user profile
router.patch('/:id', updateUserProfile); // Route to update user profile

export default router;
