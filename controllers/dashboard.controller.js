const Joi = require('joi');
const User = require('../models/Tailors');
const { ensureAuth } = require('../middleware/auth');

module.exports = class DashboardController {
	static dashboard(req, res) {
		res.render('dashboard', { name: req.user });
	}

	static edit(req, res) {
		res.render('dashboardEdit', { name: req.user });
	}

	static async editPut(req, res) {
		const dashboardSchema = Joi.object({
			displayName    : Joi.string().trim().min(3).max(50).required(),
			companyName    : Joi.string().trim().min(3).max(50).required(),
			firstName      : Joi.string().trim().min(3).max(50).required(),
			lastName       : Joi.string().trim().min(3).max(50).required(),
			title          : Joi.string().trim().min(3).max(50).required(),
			location       : Joi.string().trim().min(3).max(50),
			phoneNumber    : Joi.string().trim().min(3).max(50),
			about          : Joi.string().lowercase().trim().min(3).max(300).required(),
			specialization : Joi.string().lowercase().trim().min(3).max(50).required(),
			facebook       : Joi.string().lowercase().trim().min(3).max(50),
			instagram      : Joi.string().lowercase().trim().min(3).max(50),
			twitter        : Joi.string().lowercase().trim().min(3).max(50),
			pinterest      : Joi.string().lowercase().trim().min(3).max(50)
		});
		try {
			const result = await dashboardSchema.validateAsync(req.body);
			const {
				displayName,
				companyName,
				firstName,
				lastName,
				title,
				location,
				phoneNumber,
				about,
				specialization,
				facebook,
				instagram,
				twitter,
				pinterest
			} = result;
			const details = await User.findOne({ where: { id: req.user.id } });
			details.displayName = displayName;
			details.companyName = companyName;
			details.firstName = firstName;
			details.lastName = lastName;
			details.title = title;
			details.location = location;
			details.phoneNumber = phoneNumber;
			details.about = about;
			details.specialization = specialization;
			details.facebook = facebook;
			details.instagram = instagram;
			details.twitter = twitter;
			details.pinterest = pinterest;
			await details.save({
				fields : [
					'displayName',
					'companyName',
					'firstName',
					'lastName',
					'title',
					'location',
					'phoneNumber',
					'about',
					'specialization',
					'facebook',
					'instagram',
					'twitter',
					'pinterest'
				]
			});

			res.redirect('/dashboard');
		} catch (err) {
			console.log(err);
		}
	}
};
