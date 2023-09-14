"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  UserLibrary.init(
    {
      Id: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      LibraryId: DataTypes.INTEGER,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserLibrary",
      updatedAt:false
    }
  );
  return UserLibrary;
};
