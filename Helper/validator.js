const { body } = require("express-validator");
const db = require("../models");
const User = db.user;

const emailExists = async (email) => {
  const existingUser = await User.findOne({ where: { Email: email } });
  return existingUser !== null;
};
exports.validateRegister = [
  body("Name").notEmpty().withMessage("Name is required"),
  body("Email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      if (await emailExists(email)) {
        throw new Error("Email already exists");
      }
    }),
  body("Password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/)
    .withMessage(
      "Password must contain at least one number, one letter, and one special character"
    ),
];

