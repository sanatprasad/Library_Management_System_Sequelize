const { validationResult } = require("express-validator");
const db = require("../models");
const User = db.user;
const UserLibrary = db.userlibrary;
const Book = db.book;
const UserBook = db.userbook;
const bcrypt = require("bcrypt");
const Op = db.Sequelize.Op;
const time = require("../Helper/epochtime");
const jwtAuth = require("../Helper/jwt_auth");
const mail = require("../Helper/email_sender");

// Create and Save a new Tutorial
exports.register = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.send(validationErrors.array());
    }

    const hashedpassword = await bcrypt.hash(req.body.Password, 10);
    const user = {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hashedpassword,
      AccountType: req.body.AccountType,
      VerfifyToken: null,
      AccessToken: null,
      profileImg: req.file ? req.file.path : null,
      createdAt: time.epochtime(),
    };
    User.create(user).then((data) => {
      const library_id = req.body.LibraryId;
      UserLibrary.create({
        UserId: data.id,
        LibraryId: library_id,
        createdAt: time.epochtime(),
      });
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured for register a new user",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.send({ message: "User not Found" });
    }
    const PasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!PasswordMatch) {
      return res.send({
        message: "Invalid password",
      });
    }
    const token = jwtAuth.generateToken(user.id, user.Email);
    user.AccessToken = token;
    await user.save();
    res
      .status(200)
      .send({ message: "login successful", accesstoken: token });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured for login",
    });
  }
};
exports.list_of_books = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured for list of book",
    });
  }
  const library_id = 4;
  const list = await Book.findAll({ where: { LibraryId: library_id } });
  res.status(200).send(list);
};
exports.issue_book = async (req, res) => {
  try {
    await UserBook.create({
      ...req.body,
      IssueDate: time.epochtime(),
      createdAt: time.epochtime(),
    }).then(async (data) => {
      const name_of_book = await Book.findOne({ where: { Id: data.BookId } });
      const email = await User.findOne({ where: { Id: data.UserId } });
      const book = {};
      book.user = email.Name;
      book.name = name_of_book.Name;
      const issueDateEpoch = data.IssueDate;
      const issueDate = new Date(issueDateEpoch);
      const submit = false;
      book.submit = submit;
      book.date = issueDate;
      mail.sendbookdetails(email.Email, book);
      res
        .status(200)
        .send(
          "Your book is successfully issued, information about this book will be shared with email"
        );
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured for login",
    });
  }
};
exports.submit_book = async (req, res) => {
  try {
    const BookId = req.body.BookId;
    await UserBook.update(
      { SubmitDate: time.epochtime(), updatedAt: time.epochtime() },
      { where: { BookId: BookId } }
    ).then(async (data) => {
      const book_data = await UserBook.findOne({ where: { id: data[0] } });
      const name_of_book = await Book.findOne({
        where: { Id: book_data.BookId },
      });
      
      const email = await User.findOne({ where: { Id: book_data.UserId } });
      console.log(name_of_book);
      const book = {};
      book.user = email.Name;
      book.name = name_of_book.Name;
      const submitDateEpoch = book_data.updatedAt;
      const submitDate = new Date(submitDateEpoch);
      book.date = submitDate;
      const submit = true;
      book.submit = submit;
      mail.sendbookdetails(email.Email, book);
      res
        .status(200)
        .send(
          "Your book is successfully submitted, information about this  will be shared with email"
        );
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured for login",
    });
  }
};
