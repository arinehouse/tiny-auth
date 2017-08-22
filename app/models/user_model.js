import Sequelize from 'sequelize';
import sequelize from './index';

// user model
// contains email and password, and keeps track of whether this user has
// pressed the button
const User = sequelize.define(('user'), {
  email: { type: Sequelize.STRING, unique: true, validate: { isEmail: true } },
  password: Sequelize.STRING,
  pressedButton: { type: Sequelize.BOOLEAN, defaultValue: false },
});

// synchronize this user model with sequelize
User.sync();

export default User;
