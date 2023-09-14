module.exports = (app) => {
  const auther = require("../controller/AutherController");
  const auth = require("../Helper/jwt_auth");
  const verifytoken = auth.verifyToken;
  const check = require("../Helper/Role_check");

  var router = require("express").Router();

  // Create a new Tutorial
  router.get("/",  auther.findAll);
  router.get("/:id", verifytoken, check.checkUserRole(1), auther.findOne);
  router.post("/", verifytoken, check.checkUserRole(1), auther.create);
  router.put("/:id", verifytoken, check.checkUserRole(1), auther.update);
  router.delete("/:id", verifytoken, check.checkUserRole(1), auther.delete);
  router.delete("/", verifytoken, check.checkUserRole(1), auther.deleteAll);
  app.use("/api/auther", router);
};
