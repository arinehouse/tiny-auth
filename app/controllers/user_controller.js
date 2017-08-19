import User from '../models/user_model';

// Takes in a user object and verifies the email and password.
export const signIn = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      res.status(400).send('Username does not exist');
    } else if (user.password !== req.body.password) {
      res.status(403).send('Invalid password');
    } else {
      res.sendStatus(200);
    }
  });
};

// Takes in information on a new user, and creates one if this email does not already exist
export const signUp = (req, res) => {
  if (req.body.password !== req.body.passwordRepeat) {
    res.status(400).send('Passwords do not match');
  } else {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        // Error: user already exists!
        res.status(409).send('User already exists');
      } else {
        // Create the new user
        const newuser = {
          email: req.body.email,
          password: req.body.password,
        };
        User.create(newuser).then((response) => {
          res.redirect('/');
        });
      }
    });
  }
};

export const pushButton = (user) => {
  // Takes a user object, and if they have not yet pushed the button,
  // increments the button counter by one.
};
