import User from '../models/userModel.js';  // Use import instead of require

// Create a new user
export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);  // Log the actual error
        res.status(400).json({ message: error.message });
    }
};
