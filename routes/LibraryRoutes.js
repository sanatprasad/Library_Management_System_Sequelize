module.exports = (app) => {
  const library = require("../controller/LibraryController");

  var router = require("express").Router();
  const auth = require("../Helper/jwt_auth");
  const verifytoken = auth.verifyToken;
  const check = require("../Helper/Role_check");

  // Create a new Tutorial
  router.get("/",  library.findAll);
  router.get("/:id", verifytoken, check.checkUserRole(1), library.findOne);
  router.post("/", verifytoken, check.checkUserRole(1), library.create);
  router.put("/:id", verifytoken, check.checkUserRole(1), library.update);
  router.delete("/:id", verifytoken, check.checkUserRole(1), library.delete);
  router.delete("/", verifytoken, check.checkUserRole(1), library.deleteAll);

  app.use("/api/library", router);
};
