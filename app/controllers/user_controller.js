import User from '../models/user_model';
import * as ButtonController from './button_controller';

// logout destroys the current session and redirects to signin
export const logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/signin');
  });
};

// fetch the user linked with this id
export const fetchUser = (id) => {
  return User.findById(id);
};

// See who pressed the button. If they have not already pressed it,
// then call increment on the button.
// Update the user so that its pressedButton field is true
export const buttonPressed = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (user.pressedButton === false) {
      ButtonController.increment(req.body.buttonid);
      user.pressedButton = true;
      user.save();
    }
  });
};
