const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { isTokenValid } = require("../middlewares/auth.middlewares");

//POST "/api/auth/signup"
router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400).json({ errormessage: "todos los campos obligatorios" });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({ errorMessage: "La contraseña no es suficientemente fuerte" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser) {
      res
        .status(400)
        .json({ errorMessage: "Usuario ya registrado con ese email" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email: email,
      username: username,
      password: hashPassword,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//POST "/api/auth/login"

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errormessage: "todos los campos obligatorios" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
      return;
    }

    const isPasswordcorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isPasswordcorrect);
    if (isPasswordcorrect === false) {
      res.status(400).json({ errorMessage: "contraseña chunga" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "100 days",
    });

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//GET "/api/auth/verify"
router.get("/verify", isTokenValid, (req, res, next) => {
  console.log(req.payload);

  res.status(200).json({ payload: req.payload });
});

module.exports = router;
