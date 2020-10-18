'use strict';

module.exports = {
	up   : async (queryInterface, Sequelize) => {
		await queryInterface.createTable('jobs', {
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
			},
			createdAt     : Sequelize.DATE,
			updatedAt     : Sequelize.DATE
		});
	},

	down : async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('jobs');
	}
};
