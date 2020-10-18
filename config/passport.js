const GoogleStrategy = require('passport-google-oauth20').Strategy;
const localStrategy = require('passport-local');
const Sequelize = require('sequelize');
const User = require('../models/Tailors');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID     : process.env.CLIENT_ID,
				clientSecret : process.env.CLIENT_SECRET,
				callbackURL  : '/auth/google/callback'
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					googleId    : profile.id,
					displayName : profile.displayName,
					firstName   : profile.name.givenName,
					lastName    : profile.name.familyName,
					email       : profile.emails[0].value,
					image       : profile.photos[0].value
				};

				try {
					// check if email associated with the particular google account has already been used
					let emailExist = await User.findOne({ where: { email: profile.emails[0].value } });
					if (emailExist && emailExist.password)
						return done(null, false, {
							msg : 'the email associated with this google account has already been used'
						});

					// check if the user already exists
					let user = await User.findOne({ where: { googleId: profile.id } });
					console.log(user, profile.emails[0].value);

					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (err) {
					console.log(err);
				}
			}
		)
	);
	passport.use(
		new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const user = await User.findOne({ where: { email: email } });
				if (!user) return done(null, false, { msg: 'email or password incorrect' });

				if (!user.password && user.googleId)
					return done(null, false, { msg: 'this email was registered using Google' });

				const isMatch = await bcrypt.compare(password, user.password);
				if (isMatch) return done(null, user);
				return done(null, false, { msg: 'email or password incorrect' });
			} catch (err) {
				console.log(err);
			}
		})
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findOne({ where: { id: id } });
			done(null, user);
		} catch (err) {
			done(error);
		}
	});
};
