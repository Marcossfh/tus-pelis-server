const Favorito = require("../models/Favorito.model");
const Movie = require("../models/Movie.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST: /comment
//DELETE: /comment/:commentId
// GET favorito
router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const favoritos = await Favorito.find({ userId: userId })
      .populate({ path: "userId", select: "username" })
      .populate({ path: "movieId", select: "title" });

    const movieIds = favoritos.map((favorito) => favorito.movieId);

    const movies = await Movie.find({ _id: { $in: movieIds } }).populate({
      path: "owner",
      select: "username",
    });

    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
});

//get movie fav
router.get("/:userId/:movieId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    console.log(req.params);

    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ message: "userId and movieId are required" });
    }

    const favorito = await Favorito.findOne({
      userId: userId,
      movieId: movieId,
    });
    console.log(favorito);
    if (!favorito) {
      return res.status(404).json({ message: "Favorito not found" });
    }
    res.status(200).json({ favoritoId: favorito._id });
  } catch (error) {
    next(error);
  }
});

// create favorito
router.post("/", isTokenValid, async (req, res, next) => {
  console.log(req.body);

  Favorito.create({
    userId: req.body.userId,
    movieId: req.body.movieId,
  })
    .then(() => {
      console.log(req.payload._id);
      res.status(201).json({ message: "favorito created" });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//delete favorito
router.delete("/:favoritoId", async (req, res, next) => {
  try {
    await Favorito.findByIdAndDelete(req.params.favoritoId);
    console.log(req.params.favoritoId);

    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
