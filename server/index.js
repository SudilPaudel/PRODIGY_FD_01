const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req,res)=>{
  res.status(200).json({message: "Server is healthy"});
})

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(4020, () => console.log('Server running on port 4020'))
  
  })
  .catch(err => console.log(err));

