import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGOURL).then(()=>{
  console.log("Success");
  app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
  });
}).catch((error)=>console.log(error));