const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, user: { username: admin.username, role: admin.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
