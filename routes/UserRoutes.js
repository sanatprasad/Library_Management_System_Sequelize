module.exports = (app) => {
  const user = require("../controller/UserController");
  const multer = require("multer");
  const path = require("path");
  const { validateRegister } = require("../Helper/validator");
  const auth = require("../Helper/jwt_auth");
  const verifytoken = auth.verifyToken;
  const check = require("../Helper/Role_check");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Images/"); // Specify the upload directory
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

  var router = require("express").Router();

  // Create a new Tutorial
  router.post(
    "/",
    upload.single("profileImg"),
    validateRegister,
    user.register,
    check.checkUserRole(1)
  );
  router.post("/login", user.login);
  router.get("/book_list", user.list_of_books);
  router.post("/book_issue", user.issue_book);
  router.post("/book_submit", user.submit_book);
  app.use("/api/user", router);
};
