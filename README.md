# TinyAuth
## A Simple Authentication Platform

### Access
The site is deployed to Heroku. You can find it [here](https://thawing-hollows-14330.herokuapp.com/).

Important note: passwords are NOT encrypted on the site. Please do not use any of your real passwords.

### Notes

The TinyAuth site is a simple three-page website made to play around with the Express.js framework. There are only three rendered pages, which are a sign-in and sign-up page, as well as the "home" page, which is only accessible to an authenticated user. If a user is not authenticated, she will be redirected to the sign-in page.

The homepage contains a single button, as well as a counter. The button is only pressable once in each user's lifetime, and afterwards the user should be unable to press it. For each unique user that presses the button, the integer counter below the button will increment by 1.

This project was a fun way to get more comfortable with the express framework, as well as addons like Passport.js and Sequelize. The full list of dependencies is listed below.

## Dependencies

### From my [Express Starterpack](https://github.com/dartmouth-cs52/express-babel-starter)
- [Babel](https://babeljs.io/): for ES6 transpiling
- [Body-Parser](https://github.com/expressjs/body-parser): middleware for parsing `req.body`
- [connect-flash](https://github.com/jaredhanson/connect-flash): for use with flash middleware in express 3/4
- [cookie-parser](https://github.com/expressjs/cookie-parser): middleware for passport.js
- [CORS](https://github.com/expressjs/cors): middleware for cross-origin resource sharing
- [dotenv](https://github.com/motdotla/dotenv): for environment variable loading with node.js
- [ejs](https://github.com/tj/ejs): embedded javascript, for HTML templating
- [Express](https://expressjs.com/): the node framework
- [MySQL](https://www.mysql.com/): the local dev environment's flavor of SQL for sequelize
- [Passport](http://passportjs.org/): authentication middleware
- [Passport-Local](https://github.com/jaredhanson/passport-local): the LocalStrategy for Passport.js
- [pg](https://github.com/go-pg/pg): PostgreSQL, needed for Heroku deployment
- [sequelize](https://github.com/sequelize/sequelize): an ORM for MySQL and Postgres

## Developer Dependencies
- [ESLint](https://eslint.org/): a javascript linter
- [Nodemon](https://github.com/remy/nodemon): a helper tool for node development

Note: This list is not exhaustive. For a complete list of dependencies, please see the [package.json](./package.json) file.
