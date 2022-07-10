'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Courses.init({
    ID: DataTypes.INTEGER,
    UniqueCode: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
    CreationDate: DataTypes.DATE,
    UserID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};