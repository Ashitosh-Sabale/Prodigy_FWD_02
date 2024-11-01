// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth'); // Import authentication routes
const User = require('./models/User'); // Import User model
const app = express();
const PORT = 8080;
const MONGO_URL = 'mongodb://localhost:27017/authDemo';

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// MongoDB Connection
(async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("DB connection error:", err);
    }
})();

// Routes
app.use('/', authRoutes);

// Define a simple route for the home page
app.get('/', (req, res) => {
    res.render('home'); // Render the home page
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
