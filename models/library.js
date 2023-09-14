"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Library.init(
    {
      Name: DataTypes.STRING,
      Location: DataTypes.STRING,
      OpeningTime: DataTypes.STRING,
      CloseTime: DataTypes.STRING,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Library",
      updatedAt: false,
    }
  );
  return Library;
};
