'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Contents', [{
      ModuleID: '',
      Title: 'initial content 3',
      Content: 'classroom 3',
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