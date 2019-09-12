const express = require('express');
const router = express.Router();


// for the signin page
router.get('/signin', (req, res) => res.send('Sign in here!'))

//for the signup page
router.get('/signup', (req, res) => res.send('Sign up here!'))

module.exports = router;