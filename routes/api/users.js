const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../../models/User");
const router = express.Router();

router.get("/test", (req, res) => res.send("This is the users route!"));
router.get("/register", (req, res) => {
  User.findOne({email: req.email})
  .then(user => {
    if(user) {
      res.status(400).json("A user with this email already exists!");
    } else {
      const newUser = new User({
        handle: req.handle,
        email: req.email,
        password: req.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
});

module.exports = router;