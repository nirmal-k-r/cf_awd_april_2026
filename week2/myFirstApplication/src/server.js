//imports
const express = require('express');
const ejs = require('ejs');
const path = require('path');


//router imports
const adminRouter = require('./routes/admin');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');

//create express app
const app = express();

//middleware
app.set('view engine', 'ejs'); 
//set template directory
app.set('views', 'src/templates');

//set static files directory
app.use(express.static('public'));


// Logging middleware
app.use((req,res,next) => {
    console.log(`${req.method}${req.url}`);
    next();
});

//start server
const PORT = process.env.PORT || 3000;


//connect routers
app.use('/admin', adminRouter);
app.use('/home', homeRouter);
app.use('/auth', authRouter);

// 404 handler (must be after all routes) - 404 -This runs if no route matches the request.
app.use((req,res) => {
res.status(404).send('Page not found');
});

// Error handling middleware - 500 - This handles unexpected errors in the application.
app.use((err,req,res,next) => {
console.error(err.stack);
res.status(500).send('Something went wrong');
});

//server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//http://localhost:3000
