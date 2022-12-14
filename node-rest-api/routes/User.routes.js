const express = require("express");
const app = express();

const userRoute = express.Router();
let User = require("../model/User");

// Add User
userRoute.route("/add-user").post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all Users
userRoute.route("/").get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get User
userRoute.route("/read-user/:id").get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update User
userRoute.route("/update-user/:id").put((req, res, next) => {
  console.log(req.params.id)
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        // console.log(error);
      } else {
        res.json(data);
        console.log("User updated successfully!");
      }
    }
  );
});

// Delete USer
userRoute.route("/delete-user/:id").delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = userRoute;
