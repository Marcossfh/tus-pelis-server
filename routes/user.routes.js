const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { isTokenValid } = require("../middlewares/auth.middlewares")
                       
//PATCH:  /user         {img}       changes user img

module.exports = router