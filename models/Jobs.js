const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const { STRING } = require('sequelize');

const Job = sequelize.define('jobs', {
	id            : {
		type          : Sequelize.INTEGER(11),
		allowNull     : false,
		autoIncrement : true,
		primaryKey    : true
	},
	title         : {
		type : Sequelize.STRING(200)
	},
	sample_image  : {
		type : Sequelize.STRING(200)
	},
	description   : {
		type : Sequelize.STRING(200)
	},
	budget        : {
		type : Sequelize.STRING(200)
	},
	contact_email : {
		type : Sequelize.STRING(200)
	}
});

module.exports = Job;
