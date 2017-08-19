import Button from '../models/button_model';

// Returns all buttons, but there should only be one anyway
export const fetchButton = () => {
  return Button.findAll({});
};

export const increment = (req, res) => {
  return Button.findById(req.params.id).then((button) => {
    button.numClicks += 1;
    button.save();
  });
};
