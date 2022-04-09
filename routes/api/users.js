const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const secret = require("../../config/keys").secret;
const User = require("../../models/User");
const router = express.Router();

router.get("/test", (req, res) => res.send("This is the users route!"));

router.post("/register", (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      return res.status(400).json({email: "A user with this email already exists!"});
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
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

router.post("/login", (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user) return res.status(404).json({email: 'This email is not registered to a user!'})

      bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({password: 'Password is incorrect'})

          const payload = {id: user.id, handle: user.handle};

          jwt.sign(payload, secret, {expiresIn: 3600}, (err, token) => {
            res.json({success: true, token: 'Bearer ' + token});
          })
        })
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

module.exports = router;