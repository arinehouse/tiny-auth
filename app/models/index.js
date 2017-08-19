import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
   // the application is executed on Heroku, so use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
  });
} else {
   // the application is executed on the local machine, use mysql instead
  sequelize = new Sequelize('tinyauth', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });
}

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully');
}).catch((err) => {
  console.log('Unable to connect to database:', err);
});

export default sequelize;
