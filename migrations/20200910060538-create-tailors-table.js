'use strict';

module.exports = {
	up   : async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id             : {
				type          : Sequelize.INTEGER(11),
				allowNull     : false,
				autoIncrement : true,
				primaryKey    : true
			},
			googleId       : {
				type : Sequelize.STRING(200)
			},
			displayName    : {
				type      : Sequelize.STRING(200),
				allowNull : false
			},
			companyName    : {
				type : Sequelize.STRING(200)
			},
			title          : {
				type : Sequelize.STRING(20)
			},
			firstName      : {
				type      : Sequelize.STRING(200),
				allowNull : false
			},
			lastName       : {
				type      : Sequelize.STRING(200),
				allowNull : false
			},
			location       : {
				type : Sequelize.STRING(200)
			},
			image          : {
				type : Sequelize.STRING(200)
			},
			coverImage     : {
				type : Sequelize.STRING(200)
			},
			email          : {
				type      : Sequelize.STRING(200),
				allowNull : false,
				unique    : true
			},
			phoneNumber    : {
				type : Sequelize.STRING(20)
			},
			about          : {
				type : Sequelize.STRING(300)
			},
			specialization : {
				type : Sequelize.STRING(200)
			},
			ratings        : {
				type : Sequelize.STRING(200)
			},
			facebook       : {
				type : Sequelize.STRING(200)
			},
			instagram      : {
				type : Sequelize.STRING(200)
			},
			twitter        : {
				type : Sequelize.STRING(200)
			},
			pinterest      : {
				type : Sequelize.STRING(200)
			},
			password       : {
				type : Sequelize.STRING(200)
			},
			createdAt      : Sequelize.DATE,
			updatedAt      : Sequelize.DATE
		});
	},

	down : async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users');
	}
};
