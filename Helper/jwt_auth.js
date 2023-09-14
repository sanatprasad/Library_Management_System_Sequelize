const jwt = require("jsonwebtoken");
const jwtSecret = "your_secret_key"; // Replace with your own secret key

// Generate JWT token
function generateToken(id, Email) {
  return jwt.sign({ id, Email }, jwtSecret, { expiresIn: "24h" }); // Token expires in 1 hour
}

// Verify JWT token
verifyToken = (req, res, next) => {
  let token = req.headers["token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
