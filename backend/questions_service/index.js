const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const PORT = process.env.PORT || 8001;
const MONGOURL = process.env.MONGO_URL;
const questionsRoutes = require("./routes/questions");

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGOURL).then(()=>{
  console.log("Success");
  app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
  });
}).catch((error)=>console.log(error));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use("/questions", questionsRoutes);

