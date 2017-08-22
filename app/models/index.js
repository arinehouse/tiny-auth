import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// define a sequelize variable for module export
let sequelize;

// check if a postgres DATABASE_URL exists
if (process.env.DATABASE_URL) {
   // if it does, the application is executed on Heroku, so use the postgres database
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

// initialize sequelize, and log the result
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully');
}).catch((err) => {
  console.log('Unable to connect to database:', err);
});

export default sequelize;
