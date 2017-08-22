# TinyAuth
## A Simple Authentication Platform

### Access
The site is deployed to Heroku. You can find it [here](https://thawing-hollows-14330.herokuapp.com/).

### Running Locally
If you want to run locally instead of on Heroku, follow these steps:

1. Clone this repo
```sh
$ git clone git@github.com:arinehouse/tiny-auth.git
$ cd tiny-auth
```
2. Install dependencies
```sh
$ npm install
```
3. Create a .env file, and add two variables:
  1. AUTH_SECRET: can be anything, it just needs to be a unique identifier for
  you so passport can manage your sessions
  2. PASSWORD: the password for the MySQL root user on your machine
4. Go!
```sh
$ npm start
```
The project will be running at `localhost:9090`.

### Notes

The TinyAuth site is a simple three-page website made to play around with the Express.js framework. There are only three rendered pages, which are a sign-in and sign-up page, as well as the "home" page, which is only accessible to an authenticated user. If a user is not authenticated, she will be redirected to the sign-in page.

The homepage contains a single button, as well as a counter. The button is only pressable once in each user's lifetime, and afterwards the user should be unable to press it. For each unique user that presses the button, the integer counter below the button will increment by 1.

This project was a fun way to get more comfortable with the express framework, as well as addons like Passport.js, bCrypt, and Sequelize. The full list of dependencies is listed below.

## Dependencies

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/): for safe (encrypted) storage of passwords
- [cookie-parser](https://github.com/expressjs/cookie-parser): middleware for passport.js
- [dotenv](https://github.com/motdotla/dotenv): for environment variable loading with node.js
- [MySQL](https://www.mysql.com/): the local dev environment's flavor of SQL for sequelize
- [Passport](http://passportjs.org/): authentication middleware
- [Passport-Local](https://github.com/jaredhanson/passport-local): the LocalStrategy for Passport.js
- [pg](https://github.com/go-pg/pg): PostgreSQL, needed for Heroku deployment
- [sequelize](https://github.com/sequelize/sequelize): an ORM for MySQL and Postgres

### From the [Express Starterpack](https://github.com/dartmouth-cs52/express-babel-starter)
(A tool from Dartmouth CS52 - Full Stack Web Development, Spring 2017)
- [Babel](https://babeljs.io/): for ES6 transpiling
- [Body-Parser](https://github.com/expressjs/body-parser): middleware for parsing `req.body`
- [connect-flash](https://github.com/jaredhanson/connect-flash): for use with flash middleware in express 3/4
- [cookie-parser](https://github.com/expressjs/cookie-parser): middleware for passport.js
- [CORS](https://github.com/expressjs/cors): middleware for cross-origin resource sharing
- [ejs](https://github.com/tj/ejs): embedded javascript, for HTML templating
- [Express](https://expressjs.com/): the node framework

## Developer Dependencies
- [ESLint](https://eslint.org/): a javascript linter
- [Nodemon](https://github.com/remy/nodemon): a helper tool for node development

Note: This list is not exhaustive. For a complete list of dependencies, please see the [package.json](./package.json) file.
