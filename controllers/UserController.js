const express = require("express");
const router = express.Router();
const db = require("../models");

// Find all user data
router.get("/api/users", (req, res) => {
  db.User.find({})
    .then(userData => {
      res.json({
        error: false,
        data: userData,
        message: "Successfully retrieved all user data.",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Error retrieving user data.",
      });
    });
});

// Find one user and all items in their inventory
router.get('/api/users/:id', (req, res) => {
  db.User.findOne({ _id: req.params.id })
    .populate('items')
    .then(userData => {
        res.json({
          error: false,
          data: userData,
          message: "Successfully retrieved single user data.",
        });
      })
      .catch(err => {
        res.status(500).json({
          error: true,
          data: null,
          message: "Error retrieving user data.",
        });
      });
});

router.post("/api/users", (req, res) => {
  db.User.create(req.body)
    .then(newUserData => {
      res.json({
        error: false,
        data: newUserData,
        message: "Successfully added new user.",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Error adding new user to database.",
      });
    });
});
// Login
router.post("/api/login", (req, res) => {
  console.log(req.body)
  db.User.findOne({email: req.body.email})
    .then(newUserData => {
      res.json({
        error: false,
        data: newUserData,
        message: "Successfully added new user.",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Error adding new user to database.",
      });
    });
});

router.put("/api/users/:id", (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((userData) => {
        res.json({
          error: false,
          data: userData,
          message: "Successfully updated user data.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: true,
          data: null,
          message: "Error retrieving user data.",
        });
      });
  });

module.exports = router;
