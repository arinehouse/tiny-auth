import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user_model';

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true,
  },
  (email, password, done) => {
    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        return done(null, false, { message: 'Username already taken' });
      } else {
        const newuser = {
          email,
          password,
          pressedButton: false,
        };
        return User.create(newuser).then((newUser) => {
          if (!newUser) {
            return done(null, false);
          } else {
            return done(null, newUser);
          }
        });
      }
    });
  }));

passport.use('local-signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true,
  },
  (email, password, done) => {
    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        return done(null, false);
      } else if (user.password !== password) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  },
));

// serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

export default passport;
