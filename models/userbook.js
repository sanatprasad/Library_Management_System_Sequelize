"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  UserBook.init(
    {
      Id: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      BookId: DataTypes.INTEGER,
      IssueDate: DataTypes.INTEGER,
      SubmitDate: DataTypes.INTEGER,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserBook",
      updatedAt: false,
    }
  );
  return UserBook;
};
