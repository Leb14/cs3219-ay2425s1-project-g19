import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
    username: { type: String, required: [true, 'Username is required'] },  
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },   
    createdAt: { type: Date, default: Date.now },  
    isAdmin: { type: Boolean, default: false }
  });

// Create the model
const User = new mongoose.model('User', userSchema);  

// Export the model as default
export default User;
