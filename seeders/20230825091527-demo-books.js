"use strict";
const time = require("../Helper/epochtime");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Books", [
      {
        Name: "The Catcher in the Rye",
        LibraryId: 1,
        Isavailable: false,
        createdAt: time.epochtime(),
      },
      {
        Name: "To Kill a Mockingbird",
        LibraryId: 1,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "1984",
        LibraryId: 1,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "The Great Gatsby",
        LibraryId: 1,
        Isavailable: false,
        createdAt: time.epochtime(),
      },
      {
        Name: "Pride and Prejudice",
        LibraryId: 1,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "To Kill a Mockingbird",
        LibraryId: 2,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "1984",
        LibraryId: 2,
        Isavailable: false,
        createdAt: time.epochtime(),
      },
      {
        Name: "The Great Gatsby",
        LibraryId: 2,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "Pride and Prejudice",
        LibraryId: 2,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "The Catcher in the Rye",
        LibraryId: 2,
        Isavailable: false,
        createdAt: time.epochtime(),
      },
      {
        Name: "The Catcher in the Rye",
        LibraryId: 3,
        Isavailable: false,
        createdAt: 1693167612,
      },
      {
        Name: "To Kill a Mockingbird",
        LibraryId: 3,
        Isavailable: true,
        createdAt: 1693167613,
      },
      {
        Name: "Harry Potter and the Sorcerer's Stone",
        LibraryId: 3,
        Isavailable: true,
        createdAt: 1693167614,
      },
      {
        Name: "1984",
        LibraryId: 3,
        Isavailable: false,
        createdAt: 1693167615,
      },
      {
        Name: "The Lord of the Rings",
        LibraryId: 3,
        Isavailable: true,
        createdAt: 1693167616,
      },
      {
        Name: "Book1",
        LibraryId: 4,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "Book2",
        LibraryId: 4,
        Isavailable: false,
        createdAt: time.epochtime(),
      },
      {
        Name: "Book3",
        LibraryId: 4,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "Book4",
        LibraryId: 4,
        Isavailable: true,
        createdAt: time.epochtime(),
      },
      {
        Name: "Book5",
        LibraryId: 4,
        Isavailable: false,
        createdAt: time.epochtime(),
      },
      {
        Name: "The Catcher in the Rye",
        LibraryId: 5,
        Isavailable: false,
        createdAt: 1693371727,
      },
      {
        Name: "To Kill a Mockingbird",
        LibraryId: 5,
        Isavailable: true,
        createdAt: 1693371727,
      },
      {
        Name: "1984",
        LibraryId: 5,
        Isavailable: true,
        createdAt: 1693371727,
      },
      {
        Name: "The Great Gatsby",
        LibraryId: 5,
        Isavailable: false,
        createdAt: 1693371727,
      },
      {
        Name: "Pride and Prejudice",
        LibraryId: 5,
        Isavailable: true,
        createdAt: 1693371727,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
