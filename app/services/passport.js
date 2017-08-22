import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user_model';

// number of salt rounds for the bcrypt hash
const saltRounds = 10;

// local signup strategy, for username and password
// username in this case must be an email
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    // see if there is a user matching this email
    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        // if the user exists, return with an error
        return done(null, false, req.flash('message', 'Sorry, that email address is already taken!'));
      } else {
        // otherwise, hash the password and create a new user
        return bcrypt.genSalt(saltRounds, (err, salt) => {
          return bcrypt.hash(password, salt, (error, hash) => {
            const newuser = {
              email,
              password: hash,
              pressedButton: false,
            };
            return User.create(newuser).then((newUser) => {
              if (!newUser) {
                // if the user failed to be created, return an error
                return done(null, false, req.flash('message', 'Error: failed to create new user'));
              } else {
                // otherwise, return the new user
                return done(null, newUser);
              }
            }).catch((err) => {
              return done(null, false, req.flash('message', 'Error: failed to create new user'));
            });
          });
        });
      }
    });
  }));

// local signin strategy, for username and password
// username in this case must be an email
passport.use('local-signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    // find the user with this email address
    User.findOne({ where: { email } }).then((user) => {
      // if the user does not exist, return an error
      if (!user) {
        return done(null, false, req.flash('message', 'Oops! That email is not registered.'));
      } else {
        // otherwise, see if the passwords match
        return bcrypt.compare(password, user.password, (err, res) => {
          if (!res) {
            // if they don't return an error
            return done(null, false, req.flash('message', 'Invalid password'));
          } else {
            // otherwise, sign the user in
            return done(null, user);
          }
        });
      }
    });
  },
));

// serialize user data to store for passport session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user from the passport session
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
