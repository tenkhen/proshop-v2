import jwt from 'jsonwebtoken';
import asyncHander from './asyncHandler';
import User from '../models/userModel';

// Protect middleware
const protect = asyncHander(async (req, res, next) => {
  let token;

  // read the JWT from the cookie. jwt is the name we gave in userController (req.cookie('jwt'))
  token = req.cookies.jwt;

  if (token) {
    try {
      // decode the jwt token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // password is not added
      // this req.user is accessible from all our routes
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { admin, protect };
