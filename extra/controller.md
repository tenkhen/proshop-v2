# CONTROLLER GUIDE - Controller functions for routes

### Create a folder called controllers in backend, create a controller file (e.g. productController.js)

### Add following code in it (just for example)

#### Check asyncHandler.md
```js
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async(req, res) => {
  <!-- passing empty object we will get all products -->
  const products = await Product.find({});
  res.json(products);
})

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  public
const getProductById = asyncHandler(async(req, res) => {
  <!-- for single product, we use findById and pass id we get from params -->
  const product = await Product.findById(res.params.id)

  if(product) {
    res.json(product);
  } else {
    <!-- 404 - Not Found -->
    res.status(404);
    <!-- we are handling this error. Check errorMiddleware.md -->
    throw new Error('Resource not found');
  }
})
```

---

### User conroller
```js
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // get user based on email (check if the email we pass matches to the email in user model)
  const user = await User.findOne({ email });

  // check if password we passed matches to the password in user model
  // check in bcryptjs.md how to implement this matching password
  if (user && (await user.matchPassword(password))) {

    // check generateToken.js in util folder (backend)
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
  res.clearCookie('jwt');

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

```

### Parse body - In order to get data from 'req', we need to parse body. Add following code in server.js
```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```