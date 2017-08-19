import User from '../models/user_model';

export const logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

export const fetchUser = (id) => {
  return User.findById(id);
};

// Takes a user object, and if they have not yet pushed the button,
export const buttonPressed = (req, res) => {
  User.findById(req.params.id).then((user) => {
    user.pressedButton = true;
    user.save();
  });
};
