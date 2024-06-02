// index.js

const express = require('express');
const mongoose = require('mongoose');
const User = require('./user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pentru a permite analiza corpului cererilor JSON
app.use(express.json());

// Conectarea la baza de date MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Ruta GET pentru obținerea tuturor utilizatorilor
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta POST pentru adăugarea unui utilizator nou
app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează la adresa http://localhost:${PORT}`);
});
