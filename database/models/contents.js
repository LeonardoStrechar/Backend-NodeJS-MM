'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contents.init({
    ID: DataTypes.INTEGER,
    ModuleID: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    Content: DataTypes.STRING,
    CreationDate: DataTypes.DATE,
    UpdateDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Contents',
  });
  return Contents;
};