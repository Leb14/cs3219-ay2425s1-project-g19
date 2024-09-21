const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect(MONGOURL).then(()=>{
  console.log("Success");
  app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
  });
}).catch((error)=>console.log(error));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/questions', require('./questions_service/routes/questions'));