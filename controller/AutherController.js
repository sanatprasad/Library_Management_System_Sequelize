const db = require("../models");
const Auther = db.auther;
const Books=db.book;
const Op = db.Sequelize.Op;
const time = require("../Helper/epochtime");
const pagination = require("../Helper/pagination");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  try {
    const { name, email } = req.body;
    const Time = time.epochtime();
    const auther = Auther.create({
      Name: name,
      Email: email,
      createdAt: Time,
      updatedAt: null,
    }).then((auther) => {
      res
        .status(200)
        .send({ message: "data inserted successfully", data: auther });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured while inserting the data",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    let { page, size, searchfield, search, sortfield, order } = req.query;
    let condition = {};
    if (search) {
      if ((searchfield = "name")) {
        condition = {
          Name: { [Op.like]: `%${search}%` },
        };
      }
      if ((searchfield = "email")) {
        condition = {
          Email: { [Op.like]: `%${search}%` },
        };
      }
    }
    const { limit, offset } = pagination.getPagination(page, size);
    let orderBy = [];
    if (sortfield) {
      if (sortfield === "name") {
        orderBy.push(["Name", order === "desc" ? "DESC" : "ASC"]);
      } else if (sortfield === "email") {
        orderBy.push(["Email", order === "desc" ? "DESC" : "ASC"]);
      } else if (sortfield === "date") {
        orderBy.push(["createdAt", order === "desc" ? "DESC" : "ASC"]);
      }
    }
    await Auther.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: orderBy,
      include:[{
        model:Books,
        attributes:["Name"],
        as:"Books",
        through:{
          attributes:[]
        }
      }]
    }).then((data) => {
      console.log(data);
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
    const auther = await Auther.findOne({ where: { id: id } });
    if (auther) {
      res.status(200).send({ data: auther });
    } else {
      res.status(403).send({ message: "no auther find with this id" });
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
    const Name = req.body.Name;
    const Email = req.body.Email;
    console.log(Name, Email);
    const num = await Auther.update(
      {
        Name: Name,
        Email: Email,
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
    const auther = await Auther.findByPk(id);

    if (!auther) {
      return res.status(403).send({ message: "no auther found with this id" });
    } else {
      await Auther.destroy({ where: { id: id } }).then(() => {
        res
          .status(200)
          .send({ message: "data id deleted successfully", data: auther });
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
    await Auther.destroy({ where: {}, truncate: false }).then((num) => {
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
