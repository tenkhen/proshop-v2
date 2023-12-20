import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // sign takes payload object, secret and options
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // cookie takes name, value and options
  // we use name to read jwt from cookies - check authMiddleware.js
  res.cookie('jwt', token, {
    httpOnly: true,
    // https
    secure: process.env.NODE_ENV !== 'development',
    // prevent attacks
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
