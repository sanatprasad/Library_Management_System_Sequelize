"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auther extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Auther.init(
    {
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Auther",
      updatedAt: false,
    }
  );
  return Auther;
};
