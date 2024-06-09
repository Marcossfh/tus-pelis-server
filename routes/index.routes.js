const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)



const commentRouter = require("./comments.routes")
router.use("/comment", commentRouter)



const moviesRouter = require("./movies.routes")
router.use("/movies", moviesRouter)



const userRouter = require("./user.routes")
router.use("/user", userRouter)




const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);



const favoritoRouter = require("./favorito.routes")
router.use("/favorito", favoritoRouter)


module.exports = router;

