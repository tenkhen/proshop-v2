import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // get user based on email (check if the email we pass matches to the email in user model)
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    // client error (400)
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser = asyncHandler(async (req, res) => {
  // this is how we clear jwt cookie
  res.clearCookie('jwt');

  // we can also use following as well
  // res.cookie('jwt', '', {
  //   httpOnly: true,
  //   expires: new Date(0),
  // });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
  // once we have authenticated, we have access to req.user
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // not found
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   Put /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // set name as req.body.name if there is one or just keep user.name (existed one)
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // not found
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get users
// @route   GET /api/users
// @access  private / admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    res.status(404);
    throw new Error('Users not found');
  }

  res.status(200).json(users);
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  private / admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  private / admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error('Cannot delete admin user');
  }

  await User.deleteOne({ _id: user._id });
  res.status(200).json({ message: 'User deleted successfully' });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  private / admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
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
