import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// initialize MySQL with sequelize
const sequelize = new Sequelize('tinyauth', 'root', process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully');
}).catch((err) => {
  console.log('Unable to connect to database:', err);
});

export default sequelize;
