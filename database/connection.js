const { Sequelize } = require('sequelize');

const { database, username, password, host, dialect } = require('../config.json')

const sequelize = new Sequelize( database, username, password, {
	host: host,
	dialect: dialect,
    db:create
});

module.exports = { sequelize };