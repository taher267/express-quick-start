const { Strategy } = require('passport-google-oauth20');

module.exports = function (passport) {
  passport.use(
    new Strategy(
      {
        consumerKey:
          '88538777968-ja99hps1g0qkbq6ftji2kq8p61itet4u.apps.googleusercontent.com',
        clientID:
          '88538777968-ja99hps1g0qkbq6ftji2kq8p61itet4u.apps.googleusercontent.com',
        clientSecret: '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',
        consumerSecret: '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',
        callbackURL: '/auth/google/callback',
      },
      function (token, tokenSecret, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(null, profile);
        // });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      username: user.displayName,
      picture: user.image,
    });
  });
};
