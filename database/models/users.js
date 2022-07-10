'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    ID: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Status: DataTypes.STRING,
    CreationDate: DataTypes.DATE,
    UpdateDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};