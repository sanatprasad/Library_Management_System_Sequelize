const db = require("../models");
const Book = db.book;
const Library = db.library;
const BookAuther = db.bookauther;
const Op = db.Sequelize.Op;
const time = require("../Helper/epochtime");
const pagination = require("../Helper/pagination");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  try {
    const { name, library_id, is_avilable, authid } = req.body;
    const library_id_checker = await Library.findByPk(library_id);
    if (!library_id_checker) {
      return res.status(403).send({
        message: "no library found on this library id",
      });
    } else {
      const Time = time.epochtime();
      const book = await Book.create({
        Name: name,
        LibraryId: library_id,
        IsAvailable: is_avilable,
        createdAt: Time,
        updatedAt: null,
      }).then((book) => {
        const bookId = book.id;
        BookAuther.create({
          BookId: bookId,
          AutherId: authid,
          createdAt: Time,
        });
        res
          .status(200)
          .send({ message: "data  inserted  successfully", data: book });
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "error ocuured while inserting the data",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    let { page, size, searchfield, search, sortfield, order, available } =
      req.query;
    let condition = {};
    if (available == "true") {
      condition = {
        IsAvailable: 1,
      };
    }
    if (available == "false") {
      condition = {
        IsAvailable: 0,
      };
    }
    if (search) {
      if ((searchfield = "name")) {
        condition = {
          Name: { [Op.like]: `%${search}%` },
        };
      }
    }
    const { limit, offset } = pagination.getPagination(page, size);
    let orderBy = [];
    if (sortfield) {
      if (sortfield === "name") {
        orderBy.push(["Name", order === "desc" ? "DESC" : "ASC"]);
      } else if (sortfield === "date") {
        orderBy.push(["createdAt", order === "desc" ? "DESC" : "ASC"]);
      }
    }
    await Book.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: orderBy,
    }).then((data) => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "error occured while deleting the data ",
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOne({ where: { id: id } });
    if (book) {
      res.status(200).send({ data: book });
    } else {
      res.status(403).send({ message: "no book find with this id" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "error occured while deleting the data ",
    });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const library_id = req.body.library_id;
    const is_avilable = req.body.is_avilable;
    const num = await Book.update(
      {
        Name: name,
        LibraryId: library_id,
        IsAvailable: is_avilable,
        updatedAt: time.epochtime(),
      },
      { where: { id: id } }
    );

    if (num == 1) {
      res.status(200).send({
        message: "Data has been updated successfully",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "error occured while deleting the data ",
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(403).send({ message: "no book found with this id" });
    } else {
      await Book.destroy({ where: { id: id } }).then(() => {
        res
          .status(200)
          .send({ message: "data id deleted successfully", data: book });
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "error occured while deleting ",
    });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Book.destroy({ where: {}, truncate: false }).then((num) => {
      if (num == 0) {
        res.send("there is no data for delete");
      } else {
        res
          .status(200)
          .send({ message: `${num} entries were deleted successfully` });
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "error occured while deleting the data ",
    });
  }
};

// Find all published Tutorials
exports.findAllAvailable = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { IsAvailable: true } });
    if (books) {
      res.status(200).send({
        data: books,
      });
    } else {
      res.status(403).send({
        message: "no books are avilable",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "error occured while deleting the data ",
    });
  }
};
