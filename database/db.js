const Sequelize = require('sequelize');
const sequelize = new Sequelize('database-node-mm', 'root', 'root', {dialect: 'mysql', host: 'localhost'});
 
module.exports = sequelize;