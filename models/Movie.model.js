const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {

img : String,
title: {
  type: String,
  required: true,
  
},
characters: {
  type: String,
  required: true,
},
genre: [{
  type: String,
  enum: ["terror", "syfy"]
}],
sinopsis: {
  type: String,
  required: true
},
relatedMovies: String,
owner: {
  type: Schema.Types.ObjectId,
  ref: "User"
}
  }
); 

const Movie = model("Movie", movieSchema);

module.exports = Movie;