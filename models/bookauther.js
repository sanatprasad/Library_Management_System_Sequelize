"use strict";
const { Model } = require("sequelize");
const book = require("./book");
module.exports = (sequelize, DataTypes) => {
  class BookAuther extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  BookAuther.init(
    {
      BookId: DataTypes.INTEGER,
      AutherId: DataTypes.INTEGER,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BookAuther",
      updatedAt:false
    }
  );
  return BookAuther;
};
