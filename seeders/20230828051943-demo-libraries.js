"use strict";
const time = require("../Helper/epochtime");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Libraries",
      [
        {
          Name: "Book Haven",
          Location: "Toronto",
          OpeningTime: "09.30 AM",
          CloseTime: "05.30 PM",
          createdAt: time.epochtime(),
        },
        {
          Name: "Library Oasis",
          Location: "New York",
          OpeningTime: "10.00 AM",
          CloseTime: "06.00 PM",
          createdAt: time.epochtime(),
        },
        {
          Name: "Read & Relax",
          Location: "London",
          OpeningTime: "08.00 AM",
          CloseTime: "04.00 PM",
          createdAt: time.epochtime(),
        },
        {
          Name: "Bookworm Corner",
          Location: "Sydney",
          OpeningTime: "09.00 AM",
          CloseTime: "05.00 PM",
          createdAt: time.epochtime(),
        },
        {
          Name: "Pages & Places",
          Location: "Paris",
          OpeningTime: "10.30 AM",
          CloseTime: "06.30 PM",
          createdAt: time.epochtime(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
