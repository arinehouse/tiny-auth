import User from '../models/user_model';

export const logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

export const fetchUser = (id) => {
  return User.findById(id);
};

export const pushButton = (user) => {
  // Takes a user object, and if they have not yet pushed the button,
  // increments the button counter by one.
};
