const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome ...." });
});

require("./routes/AutherRoutes")(app);
require("./routes/BookRoutes")(app);
require("./routes/LibraryRoutes")(app);
require("./routes/UserRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}.`);
});
