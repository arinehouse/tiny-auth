import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user_model';

const saltRounds = 10;

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        return done(null, false, req.flash('message', 'Sorry, that email address is already taken!'));
      } else {
        return bcrypt.genSalt(saltRounds, (err, salt) => {
          return bcrypt.hash(password, salt, (error, hash) => {
            console.log(hash);
            const newuser = {
              email,
              password: hash,
              pressedButton: false,
            };
            return User.create(newuser).then((newUser) => {
              if (!newUser) {
                return done(null, false, req.flash('message', 'Error: failed to create new user'));
              } else {
                return done(null, newUser);
              }
            }).catch((err) => {
              return done(null, false, req.flash('message', 'That email address is invalid'));
            });
          });
        });
      }
    });
  }));

passport.use('local-signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        return done(null, false, req.flash('message', 'Oops! That email is not registered.'));
      } else {
        return bcrypt.compare(password, user.password, (err, res) => {
          if (!res) {
            return done(null, false, req.flash('message', 'Invalid password'));
          } else {
            return done(null, user);
          }
        });
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
