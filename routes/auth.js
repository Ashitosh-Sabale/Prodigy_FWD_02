// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signin Route
router.get('/signin', (req, res) => {
    res.render('signin'); // Render the signin page
});

router.post('/signin', async (req, res) => {
    const { username, email, mobile, password } = req.body;
    try {
        const user = new User({ username, email, mobile, password });
        await user.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
    } catch (error) {
        req.flash('error_msg', 'Error registering user');
        res.redirect('/signin');
    }
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        req.flash('success_msg', 'You are now logged in');
        res.redirect('/logged');
    } else {
        req.flash('error_msg', 'Invalid username or password');
        res.redirect('/login');
    }
});

// Logged-in Page
router.get('/logged', (req, res) => {
    res.render('logged'); // Render the logged page
});

module.exports = router;
