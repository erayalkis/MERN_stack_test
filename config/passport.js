const mongoose = require('mongoose');
const User = mongoose.model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../config/keys').secret;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // This payload includes the items we specified earlier
    User.findById(jwt_payload.id)
      .then(user => {
        if(!user) return done(null, false);

        return done(null, user);
      })
      .catch(err => console.log(err));
  }));
};