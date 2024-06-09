const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(payload);

    req.payload = payload;

    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "Token no valido o no existe" });
  }
}

module.exports = {
  isTokenValid,
};
