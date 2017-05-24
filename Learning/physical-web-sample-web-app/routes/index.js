const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

/*
 * Function to check if user is authenticated.
 * If not authenticated redirect to login page
 */
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

/*
 * To load main page.
 * Passing user object to pug to display username in UI
 */
router.get('/', isAuthenticated, (req, res) => {
    res.render('index', { user : req.user });
});

/*
 * User registration page
 */
router.get('/register', (req, res) => {
    res.render('register', { });
});

/*
 * Cretae user, insert to databse and authenticate
 */
router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

/*
 * To get login page
 */
router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

/*
 * Login a user to app
 */
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

/*
 * Handle logout -- logout and clean session cookies
 */
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
module.exports = router;
