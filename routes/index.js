const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//This is the welcome page
router.get('/', (req, res)=> res.render('welcome'))

//This is the dashboard for the logged in user
router.get('/dashboard', ensureAuthenticated,  (req, res) => 
res.render('dashboard', {
    name: req.user.name
}))

module.exports = router;