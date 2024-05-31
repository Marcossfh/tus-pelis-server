const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const moviesRouter = require("./movies.routes")
router.use("/movies", moviesRouter)

module.exports = router;
 