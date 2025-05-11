const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();



router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json(
      { 
        message: "User registered!" ,
        data: {
          newUser: newUser,
          token: token
        },
        meta: null
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24hr' });
    res.json(
      { 
        message: "User Logged In!" ,
        data: {
          user: user,
          token: token
        },
        meta: null 
      }
      );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', async(req,res)=>{
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    res.json({ 
      message: "User data",
      user: user
     });
  } catch (err) {
    res.status(400).json({ error: "Token is invalid" });
  }
})

router.get('/protected', (req, res) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ 
      message: "Protected content",
      user: verified.id
     });
  } catch (err) {
    res.status(400).json({ error: "Token is invalid" });
  }
});



module.exports = router;
