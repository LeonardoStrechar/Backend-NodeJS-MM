'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Modules', {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CourseID: {
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      CreationDate: {
        type: Sequelize.DATE
      },
      UpdateDate: {
        type: Sequelize.DATE
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
					model: {
						tableName: 'Users',
					},
					key: 'id',
				},
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
    await queryInterface.dropTable('Modules');
  }
};