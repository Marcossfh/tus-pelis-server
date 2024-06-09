const { Schema, model } = require("mongoose");

const favoritoSchema = new Schema(
  {
    userId: {
      type: String,
    },
    movieId: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Favorito = model("Favorito", favoritoSchema);

module.exports = Favorito;
