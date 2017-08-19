import Sequelize from 'sequelize';
import sequelize from './index';

const Button = sequelize.define(('button'), {
  numClicks: { type: Sequelize.INTEGER },
});

Button.sync({ force: true }).then(() => {
  return Button.create({
    numClicks: 0,
  });
});

export default Button;
