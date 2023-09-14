'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      AccountType: {
        type: Sequelize.BOOLEAN
      },
      AccessToken: {
        type: Sequelize.STRING
      },
      VerifyToken: {
        type: Sequelize.STRING
      },
      ProfileImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue:null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};