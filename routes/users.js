const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model for Mongo DB
const User = require('../models/User')

// for the signin page
router.get('/login', (req, res) => res.render('login'))

//for the signup page
router.get('/register', (req, res) => res.render('register'))

// Register Handle
router.post('/register', (req, res)=>{
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Checking for errors in the Signup form
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    //To check if the passwords are matching
    if(password!==password2) {
        errors.push ({ msg: 'Passwords do not match' })
    }

    //To check the password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2 
        })
    }
    else {
        //Validation pass
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                //User Exists
                errors.push({ msg: 'Email is already registered' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                }) 
            } else {
                const newUser = new User({
                    name,
                    email,
                    password                    
                })
                //Encrypting the password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //This sets the password to a hash value
                        newUser.password = hash;

                        //Saving the user
                        newUser.save()
                        .then(user=> {
                            req.flash('success_msg', 'You are now registered and can sign in');
                            res.redirect('./login')
                        })
                        .catch(err=>console.log(err))
                } ) )
            }
        });

    }
        
        
})

//Login Handle
router.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    }) (req, res, next);
})

//Logout

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
})

module.exports = router;