const Comment = require("../models/Comment.model");
const {isTokenValid} = require("../middlewares/auth.middlewares")   
const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//const { isTokenValid } = require("../middlewares/auth.middlewares")

//aqui las rutas:               req.body

//POST: /comment                {text}          adds a comment
//DELETE: /comment/:commentId       -           deletes one comm

// get commment
router.get("/", async (req, res, next) => {
    try {
        const comment = await Comment.find().populate({path:"user", select: "username"})
        console.log("pasa")
        res.status(200).json(comment)
    } catch (error) {
        next(error)
        
    }
})

//get movie comment
router.get("/:movieId", async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        console.log(movieId)
        const comment = await Comment.find({ movie: movieId })
    
        res.status(200).json(comment)
    } catch (error) {
        next(error)
        
    }
})


// create comment OK
router.post("/", isTokenValid, async (req, res, next) => {
    console.log(req.body)

    Comment.create({
        text: req.body.newComment,
        user: req.payload._id,//userId
        movie: req.body.movie //movieId que viene del FE
    })
    .then(() => {
        console.log(req.payload._id)
    res.status(201).json({message: "comment created"})
    })
    .catch((error) => {
        console.log(error)
        next(error)
    })
})

// Get commentId
//router.get("/:commentId")



//delete comment OK
router.delete("/:commentId", async (req, res, next) => {
    try {
        
        await Comment.findByIdAndDelete(req.params.commentId)
        
        //res.sendStatus(202).json({message: "comment deleted"})
        res.sendStatus(202)
    } catch (error) {
        
        next(error)
    }
})
    
module.exports = router