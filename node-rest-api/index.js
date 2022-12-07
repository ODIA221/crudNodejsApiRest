const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb+srv://odia221:&&&cloud&&&@cluster0.6gnfybz.mongodb.net/gestionUser?retryWrites=true&w=majority")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Problème de connxion à mongo", err.reason);
  });

const userRoute = require("./routes/User.routes");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Static directory path
app.use(
  express.static(path.join(__dirname, "dist/gestionUser"))
);

// API root
app.use("/api", userRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Écoute sur le port " + port);
});

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/gestionUser/index.html")
  );
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
