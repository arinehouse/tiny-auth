import Button from '../models/button_model';

// returns all buttons, but there should only be one anyway
export const fetchButton = () => {
  return Button.findAll({});
};

// finds a button based on its id
// increments the button's click count by one
export const increment = (id) => {
  return Button.findById(id).then((button) => {
    button.numClicks += 1;
    button.save();
  });
};
