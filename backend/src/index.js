import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

mongoose.connect(MONGO_URL).then(()=>{
  console.log("Success");
  app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
  });
}).catch((error)=>console.log(error));