import httpStatus from 'http-status';
import passport from 'passport';
// const User = require('../models/user.model');
import APIError from '../untils/APIError';

// const ADMIN = 'admin';
// const LOGGED_USER = '_loggedUser';

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
//   const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });
  try {
    if(error || !user ) throw error;
  } catch (error) {
      return next(apiError);
  }


  

//   try {
//     if (error || !user) throw error;
//     await logIn(user, { session: false });
//   } catch (e) {
//     return next(apiError);
//   }

  // if(roles==='FULL') {
  //     apiError.status=httpStatus.FORBIDDEN;
  //     apiError.message="Not Login"
  //     return next(apiError);
  // }
    
  if (roles.length && roles.indexOf(user.role)==-1) {
 
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Bạn không có quyền';
      return next(apiError);
  } 
  // if (roles === "Leader") {
  //   if (user.role !== 'Leader') {
  //     apiError.status = httpStatus.FORBIDDEN;
  //     apiError.message = 'Bạn không có quyền';
  //     return next(apiError);
  //   }
  // } 
//   } else if (!roles.includes(user.role)) {
//     apiError.status = httpStatus.FORBIDDEN;
//     apiError.message = 'Forbidden';
//     return next(apiError);
//   } else if (err || !user) {
//     return next(apiError);
//   }

  req.user = user;

  next();
};

// exports.ADMIN = ADMIN;
// exports.LOGGED_USER = LOGGED_USER;

exports.authorize = (roles) => (req, res, next) =>
{
    passport.authenticate(
        'jwt', { session: false },
        handleJWT(req, res, next, roles),
      )(req, res, next);
}
 

// exports.oAuth = service =>
//   passport.authenticate(service, { session: false });