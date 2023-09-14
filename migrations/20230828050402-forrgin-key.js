"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("UserBooks", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("UserBooks", "BookId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Books",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("BookAuthers", "BookId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Books",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("BookAuthers", "AutherId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Authers",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("UserLibraries", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("UserLibraries", "LibraryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Libraries",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("Books", "LibraryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Libraries",
        key: "Id", // The primary key column of the referenced table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserBooks", "UserId");
    await queryInterface.removeColumn("UserBooks", "BookId");
    await queryInterface.removeColumn("BookAuthers", "BookId");
    await queryInterface.removeColumn("BookAuthers", "AutherId");
    await queryInterface.removeColumn("UserLibraries", "UserId");
    await queryInterface.removeColumn("UserLibraries", "LibraryId");
    await queryInterface.removeColumn("Books", "LibraryId");

  },
};
