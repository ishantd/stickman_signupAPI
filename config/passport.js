const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Loading the user model

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy ({ usernameField: 'email' }, (email, password, done)=> {
            //Locating and matching the user
            User.findOne({ email: email})
            .then(user=>{
                if(!user) {
                    return done(null, false, {message: 'Your email is not registered'});
                }
                //Locating and matching user's password
                bcrypt.compare(password, user.password, (err, isMatch)=> {
                    if (err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Password is incorrect'})
                    }
                })
            })
            .catch(err=>console.log(err));
        })
    );
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}