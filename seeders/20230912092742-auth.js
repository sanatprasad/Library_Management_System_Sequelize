'use strict';
const time=require("../Helper/epochtime")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
      await queryInterface.bulkInsert('Authers', [
        {
          Name: "John Doe",
          Email: "johndoe@example.com",
          createdAt: time.epochtime(),
        },
        {
          Name: "Jane Smith",
          Email: "janesmith@example.com",
          createdAt: time.epochtime(),
        },
        {
          Name: "Alice Johnson",
          Email: "alicejohnson@example.com",
          createdAt: time.epochtime(),
        },
        {
          Name: "Michael Brown",
          Email: "michaelbrown@example.com",
          createdAt: time.epochtime(),
        }]
      );
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
