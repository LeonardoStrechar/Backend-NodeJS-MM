'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ModuleID: {
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Content: {
        type: Sequelize.STRING
      },
      CreationDate: {
        type: Sequelize.DATE
      },
      UpdateDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contents');
  }
};