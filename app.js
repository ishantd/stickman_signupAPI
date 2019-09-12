const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const app = express();

// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'))

//for the users page
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen (PORT, console.log(`Server started on port ${PORT}`));

 