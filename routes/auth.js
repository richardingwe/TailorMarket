const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const AuthController = require('../controllers/auth.controller');

router
	.route('/login')
	.get(ensureGuest, AuthController.login)
	.post(passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {
		res.redirect('/dashboard');
	});

router.route('/signup').get(ensureGuest, AuthController.signup).post(ensureGuest, AuthController.signupPost);

router.get('/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res) => {
	res.redirect('/dashboard');
});

//logout user
router.route('/logout').get(AuthController.logout);

module.exports = router;
