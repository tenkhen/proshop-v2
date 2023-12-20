import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // get user based on email (check if the email we pass matches to the email in user model)
  const user = await User.findOne({ email });

  // sign takes payload object, secret and options
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  if (user && (await user.matchPassword(password))) {
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

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // 401 - unauthorized
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register user
// @route   POST /api/users/
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc    Update user profile
// @route   Put /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @desc    Get users
// @route   GET /api/users
// @access  private / admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  private / admin
const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  private / admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  private / admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
