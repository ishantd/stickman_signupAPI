const express = require('express');
const router = express.Router();


// for the signin page
router.get('/login', (req, res) => res.render('login'))

//for the signup page
router.get('/register', (req, res) => res.render('register'))

// Register Handle
router.post('/register', (req, res)=>{
    console.log(req.body)
    res.send('Hello')
})

module.exports = router;