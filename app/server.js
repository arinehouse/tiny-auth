import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import * as UserController from './controllers/user_controller';
import * as AuthController from './controllers/auth_controller';
import * as ButtonController from './controllers/button_controller';
import passport from './services/passport';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

const setCustomHeaderFunc = (req, res, next) => {
  if (process.env.LOCAL === true) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9090');
  } else {
    res.header('Access-Control-Allow-Origin', 'http://redux-blog.surge.sh');
  }
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

app.all('*', setCustomHeaderFunc);

app.set('view engine', 'ejs');
app.use(express.static('static'));
// enables static assets from folder static
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

// enable json message body for posting data to API
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.AUTH_SECRET,
  saveUninitialized: true,
  resave: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// default index route
app.get('/', AuthController.isLoggedIn, (req, res) => {
  ButtonController.fetchButton().then((buttons) => {
    res.render('index', { user: req.user, button: buttons[0] });
  });
});

// signup route
app.route('/signin')
  .get((req, res) => {
    res.render('signin', { user: null });
  })
  .post(passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
  }));

// signup route
app.route('/signup')
  .get((req, res) => {
    res.render('signup', { user: null });
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

app.get('/logout', UserController.logout);

app.post('/button/:id/inc', ButtonController.increment);

app.post('/user/:id/push', UserController.buttonPressed);

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
