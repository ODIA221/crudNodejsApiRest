const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    mail: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);
