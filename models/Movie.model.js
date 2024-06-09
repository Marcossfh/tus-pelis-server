const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  img: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  characters: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: String,
      enum: ["terror", "syfy"],
    },
  ],
  sinopsis: {
    type: String,
    required: true,
  },
  relatedMovies: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
