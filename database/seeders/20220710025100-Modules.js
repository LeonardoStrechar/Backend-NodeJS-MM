'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Modules', [{
      CourseID: '',
      Title: 'initial module 2',
      Description: 'module 2',
      CreationDate: new Date(),
      UpdateDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};