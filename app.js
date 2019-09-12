const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session')

const app = express();

//Configuring the Database
const db = require('./config/keys').MongoURI;

//Connecting to the MONGO Cluster
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

//To acquire css files
app.use(express.static(__dirname + '/public'));

// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded ({ extended: false}))

//Express Session
app.use(session({
    secret: 'stickman',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

//Connect flash
app.use(flash())

//global variables to change color for alerts
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// Routes
app.use('/', require('./routes/index'))

//for the users page
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen (PORT, console.log(`Server started on port ${PORT}`));

 