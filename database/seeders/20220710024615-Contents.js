'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Contents', [{
      ModuleID: '',
      Title: 'initial content 1',
      Content: 'classroom 1',
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