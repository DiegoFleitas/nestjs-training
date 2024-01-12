/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

const todos = [
  {
    id: 1,
    task: 'Learn NestJS',
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    task: 'Learn Sequelize',
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    task: 'Success!',
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', todos, {
      updateOnDuplicate: ['id'],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  },
};
