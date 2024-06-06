const Movie = require("../models/Movie.model")
const {isTokenValid} = require("../middlewares/auth.middlewares")   
const router = require("express").Router();


//const { isTokenValid } = require("../middlewares/auth.middlewares")

        //URL                   req.body
//GET:  /movies/:genre                    -                           allmovies
//GET:  /movies/:movieId             -                           returns movie details
//POST: /movies             {img,title,characters               creates new movie object
//                        genre,sinpsis, relatedMovies}
//DELETE:/movies/:movieId           -                           deletes single movie card
//PUT: /movies/:movieId   {img,title,characters               updates a whole movie card
//                        genre,sinpsis, relatedMovies}
//PATCH:"movies/:movieId/add-sinopsis/:sinopsis"                updates only sinopsis
//get all movies OK

//All movies OK

router.get("/", async (req, res, next) =>{
        console.log("busca pelis")
        console.log(req.params)
        try {
                
                const movies = await Movie.find().populate({path:"owner", select: "username"})//busco todas las pelis
                console.log(movies)
                res.json(movies)
                               
        } catch (error) {
                console.log(error)
                next(error)
        }
})



//get movies by genre OK
router.get("/:genre/genre", async (req, res, next) =>{
        console.log("busca peli por genero")
        console.log(req.params)
        

        try {
                //await MovieCard.find({movieId:req.params.movieId})
                const movies = await Movie.find({genre: req.params.genre})
                /*if(movies.length > 0) {
                        res.status(200).json({message: "movie founded by genre", data: movies})
                } else {
                        res.status(404).json({message: "movie not founded by genre"})
                }*/
                res.json(movies)
                               
        } catch (error) {
                console.log(error)
                next(error)
        }
})



//   Get movie id OK
router.get("/:movieId", async (req, res, next) =>{
        console.log("buscando peli")
        console.log(req.params)
        try {   

                const response = await Movie.findById(req.params.movieId)
                res.json(response)
                //res.status(200).json({message: "movie founded"})               
        } catch (error) {
                console.log(error)
                next(error)
        }
})


// Create new movie OK
router.post("/", isTokenValid, async (req,res,next) => {
        console.log(req.body)
        
        Movie.create({
                //cunado termine usamos cloudinaryimg: String,
                img: req.body.img,
                title: req.body.title,
                characters: req.body.characters,
                genre: req.body.genre,
                sinopsis: req.body.sinopsis,
                relatedMovies: req.body.relatedMovies,
                owner: req.payload._id
        })
        .then(() => {
        res.status(201).json({message: "movie created"})
        })
        .catch((error) => {
                console.log(error)
                next(error)
        })
})

// delete movie OK
router.delete("/:movieId", async (req, res, next) => {
        try {
            
            await Movie.findByIdAndDelete(req.params.movieId)
            res.json("movie deleted")
            //res.sendStatus(202).json({message: "movie deleted"})
        } catch (error) {
            
            next(error)
        }
    })

// editar movie OK
router.put("/:movieId", async (req, res, next) => {
        try {
                await Movie.findByIdAndUpdate(req.params.movieId, {
                        title: req.body.title,
                        characters: req.body.characters,
                        genre: req.body.genre,
                        sinopsis: req.body.sinopsis,
                        relatedMovies: req.body.relatedMovies,   

                })
                res.json("edited")
                //res.sendStatus(202).json({message: "movie deleted"})
            } catch (error) {
                console.log(error)
                next(error)
            }
        })

// editar parcial PACTH / me puede servir para cambiar la imagen
router.patch("/:movieId/add-sinopsis/:sinopsis", async (req, res, next) => {

        try {
                await Movie.findByIdAndUpdate(req.params.movieId, {
                        sinopsis : req.params.sinopsis
                })

                res.json("sinopsis editada")

        } catch (error) {
                console.log(error)
                next(error)
        }
})





      






module.exports = router