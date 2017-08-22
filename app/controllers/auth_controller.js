// auth_controller is not based on models, but allows checking for
// authentication based on the current passport session
// this allows restricting of access the home page to only authenticated users

// check if the session is authenticated, and if not, redirect to /signin
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/signin');
  }
};
