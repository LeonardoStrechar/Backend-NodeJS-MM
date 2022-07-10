'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Modules', [{
      CourseID: '',
      Title: 'initial module 5',
      Description: 'module 5',
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