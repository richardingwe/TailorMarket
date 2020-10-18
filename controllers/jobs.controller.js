const { ensureAuth } = require('../middleware/auth');
const Job = require('../models/Jobs');
const Joi = require('joi');

module.exports = class JobController {
	static async jobs(req, res) {
		try {
			const jobs = await Job.findAll({ order: [ [ 'createdAt', 'DESC' ] ] });
			res.render('jobs', { jobs, name: req.user });
		} catch (err) {
			console.log(err);
		}
	}

	static add(req, res) {
		res.render('add', { name: req.user });
	}

	static async addPost(req, res) {
		const jobSchema = Joi.object({
			title         : Joi.string().trim().min(3).max(50).required(),
			description   : Joi.string().trim().min(3).max(300).required(),
			budget        : Joi.number().min(3).required(),
			contact_email : Joi.string().email().required()
		});
		const result = await jobSchema.validateAsync(req.body);

		let { title, description, budget, contact_email } = result;
		let sample_image = 'image.jpg';
		try {
			const tailor = await Job.create({
				title,
				sample_image,
				description,
				budget,
				contact_email
			});
			res.redirect('/jobs');
			console.log(tailor);
		} catch (err) {
			console.log(err);
		}
	}
};
