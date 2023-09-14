const db = require("../models");
const Library = db.library;
const Op = db.Sequelize.Op;
const time = require("../Helper/epochtime");
const pagination = require("../Helper/pagination");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  try {
    const { name, location, open, close } = req.body;
    const Time = time.epochtime();
    const library = await Library.create({
      Name: name,
      Location: location,
      OpeningTime: open,
      CloseTime: close,
      createdAt: Time,
      updatedAt: null,
    }).then((library) => {
      res
        .status(200)
        .send({ message: "data inserted seccessfully ", data: library });
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "an error occured while inserting the data " });
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
      if ((searchfield = "location")) {
        condition = {
          Location: { [Op.like]: `%${search}%` },
        };
      }
    }
    const { limit, offset } = pagination.getPagination(page, size);
    let orderBy = [];
    if (sortfield) {
      if (sortfield === "name") {
        orderBy.push(["Name", order === "desc" ? "DESC" : "ASC"]);
      } else if (sortfield === "location") {
        orderBy.push(["Location", order === "desc" ? "DESC" : "ASC"]);
      } else if (sortfield === "date") {
        orderBy.push(["createdAt", order === "desc" ? "DESC" : "ASC"]);
      }
    }
    await Library.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: orderBy,
      include:[{
        model:db.user,
        attributes:["Name"],
        as:"Users",
        through:{
          attributes:[]
        }
      }]

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
    const library = await Library.findOne({ where: { id: id } });
    if (library) {
      res.status(200).send({ data: library });
    } else {
      res.status(403).send({ message: "no library find with this id" });
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
    const Location = req.body.Location;
    const OpeningTime = req.body.OpeningTime;
    const CloseTime = req.body.CloseTime;

    const num = await Library.update(
      {
        Name: Name,
        Location: Location,
        OpeningTime: OpeningTime,
        CloseTime: CloseTime,
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
    const library = await Library.findByPk(id);

    if (!library) {
      return res.status(403).send({ message: "no auther found with this id" });
    } else {
      await Library.destroy({ where: { id: id } }).then(() => {
        res
          .status(200)
          .send({ message: "data id deleted successfully", data: library });
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
    await Library.destroy({ where: {}, truncate: false }).then((num) => {
      if (num == 0) {
        return res.send("there is no data for delete");
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
