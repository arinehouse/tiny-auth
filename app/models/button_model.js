import Sequelize from 'sequelize';
import sequelize from './index';

// button model
// only keeps track of the number of clicks
const Button = sequelize.define(('button'), {
  numClicks: { type: Sequelize.INTEGER },
});

// synchronize the model with the database, and create a single button
// `force: true` deletes the buttons table if it exists already
Button.sync({ force: true }).then(() => {
  return Button.create({
    numClicks: 0,
  });
});

export default Button;
