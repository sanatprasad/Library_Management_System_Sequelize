"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      Password: DataTypes.STRING,
      AccountType: DataTypes.BOOLEAN,
      AccessToken: DataTypes.STRING,
      VerifyToken: DataTypes.STRING,
      ProfileImage: DataTypes.STRING,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      updatedAt: false,
    }
  );
  return User;
};
