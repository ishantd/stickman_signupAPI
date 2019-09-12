const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

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

// Routes
app.use('/', require('./routes/index'))

//for the users page
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen (PORT, console.log(`Server started on port ${PORT}`));

 