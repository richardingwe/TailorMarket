const Sequelize = require('sequelize');
module.exports = sequelize = new Sequelize('tailorMarket', 'root', '', {
	host    : '127.0.0.1',
	dialect : 'mysql'
});
