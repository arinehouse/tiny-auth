import Sequelize from 'sequelize';
import sequelize from './index';

const User = sequelize.define(('user'), {
  email: { type: Sequelize.STRING, unique: true, validate: { isEmail: true } },
  password: Sequelize.STRING,
  pressedButton: { type: Sequelize.BOOLEAN, defaultValue: false },
});

User.sync({ force: true });

export default User;
