# JSON WEB TOKEN GUIDE - A secure way to share data between server and client

## Install JSON Web Token on root
`npm i jsonwebtoken`

---

## Usage example - Check userController.js

### Creating token
```
import jwt from 'jsonwebtoken'

const { email } = req.body;
const user = await User.findOne({ email });

// the sign method takes payload object, secret (add this in .env) and options
const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
  // 30 days
  expiresIn: '30d'
} )
```

### Set JWT as HTTP-ONLY cookie - The safer way to implement
```
// following we don't need to send manually, it will automatically send every time we hit this specific route (/login)
// cookie takes name, value and options
// we use name to read jwt from cookies - check following Authorize using token section
res.cookie('jwt', token, {
  httpOnly: true,
  // we set this false for development, but in production we need this true for https
  secure: process.env.NODE_ENV !== 'development',
  // prevent attacks
  sameSite: 'strict',
  // expiry time in ms
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
})
```

---

## Authorize using token - We added following code authMiddle.js
```
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
```