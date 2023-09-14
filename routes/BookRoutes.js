module.exports = (app) => {
  const book = require("../controller/BookController");

  var router = require("express").Router();
  const auth = require("../Helper/jwt_auth");
  const verifytoken = auth.verifyToken;
  const check = require("../Helper/Role_check");

  // Create a new Tutorial
  router.get("/",  book.findAll);
  router.get(
    "/available",
    
    check.checkUserRole(1),
    book.findAllAvailable
  );
  router.get("/:id",  check.checkUserRole(1), book.findOne);
  router.post("/",   book.create);
  router.put("/:id",  check.checkUserRole(1), book.update);
  router.delete("/:id",  check.checkUserRole(1), book.delete);
  router.delete("/",  check.checkUserRole(1), book.deleteAll);

  app.use("/api/book", router);
};
