const User = require('../models/Tailors');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const Joi = require('joi');

module.exports = class AuthController {
	static login(req, res) {
		res.render('login', { name: req.user });
	}

	static signup(req, res) {
		const errors = [];
		res.render('signup', { name: req.user, errors });
	}

	static async signupPost(req, res) {
		const signupSchema = Joi.object({
			displayName : Joi.string().trim().min(3).max(20).required(),
			firstname   : Joi.string().trim().min(3).max(20).required(),
			lastname    : Joi.string().trim().min(3).max(20).required(),
			email       : Joi.string().email().trim().required(),
			password1   : Joi.string().trim().min(3).max(20).required(),
			password2   : Joi.ref('password1')
		}).options({ abortEarly: false });

		try {
			const result = await signupSchema.validateAsync(req.body);
			let newUser = {
				displayName : result.displayName,
				firstName   : result.firstname,
				lastName    : result.lastname,
				email       : result.email,
				password    : result.password1,
				password2   : result.password2,
				image       : '../img/image.jpg'
			};
			let user = await User.findOne({ where: { email: newUser.email } });

			if (user) {
				errors.push({ msg: 'Email is already registered' });
				res.render('signup', {
					name        : req.user,
					errors,
					displayName,
					firstName,
					lastName,
					email,
					password,
					password2
				});
			} else {
				const saltRounds = 10;
				const salt = await bcrypt.genSalt(saltRounds);
				const hash = await bcrypt.hash(newUser.password, salt);
				newUser.password = hash;
				console.log(newUser);
				user = await User.create(newUser);
			}
		} catch (error) {
			console.log(error);
			res.redirect('/auth/signup');
		}
		res.redirect('/auth/login');
	}

	static logout(req, res) {
		req.logout();
		res.redirect('/');
	}
};
