const db = require("../models");
const User = db.user;

function checkUserRole(requiredRole) {
  return async (req, res, next) => {
    const userId = req.user.id;
    try {
      const user = await User.findByPk(userId);

      if (user.AccountType == requiredRole) {
        next();
      } 
      else {
        res.status(403).send({ message: "Access forbidden" });
      }
    } 
    catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = {
  checkUserRole,
};
