import express from 'express';
import { createUser } from '../controllers/userController.js';  // Import createUser function

const router = express.Router();

// Define user routes
router.post('/users', createUser);  // Route for creating a new user

export default router;  // Export router as default
