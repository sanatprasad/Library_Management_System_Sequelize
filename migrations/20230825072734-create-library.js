"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Libraries", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
      },
      Location: {
        type: Sequelize.STRING,
      },
      OpeningTime: {
        type: Sequelize.STRING,
      },
      CloseTime: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Libraries");
  },
};
