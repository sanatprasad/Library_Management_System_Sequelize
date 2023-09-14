"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Book.init(
    {
      Name: DataTypes.STRING,
      LibraryId: DataTypes.INTEGER,
      IsAvailable: DataTypes.BOOLEAN,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
      updatedAt: false,
    }
  );
  return Book;
};
