# SEEDER GUIDE - SEED LOCAL DATA TO SERVER - INDEPENDENT FILE

## Create file called seeder.js in backend folder

## Add following codes in seeder.js

### If you importing js file, DON'T forget to add js. This is needed for ES module import
```js
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// initialize dotenv
dotenv.config();

// connect to MongoDB database
connectDB();

const importData = async () => {
  try {
    // before we import anything, first we delete everything that is on database. deleteMany() without passing anything will delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert users and return inserted user, because we need to add inserted user to product
    const createdUsers = await User.insertMany(users);

    // we get admin user from createdUser
    const adminUser = createdUsers[0]._id;

    // we loop through products, add adminUser as user to each product and then return products object and save to sampleProducts
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    // here we insert products using sampleProducts
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);

    // simply exit the app after inserting data to database
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// process.argv gets the one we type in console. (E.g. When we type 'node seeder -hi' in console, node will be at index 0 of process.argv, seeder will be at index 1 and -hi will be at index 2). Based on this argv, we will run corresponding function
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
```

---

## Create script to run seeder.js

### Add following code to package.json (root) under scripts
```js
"data:import": "node backend/seeder.js",
"data:destroy": "node backend/seeder.js -d",
```

## To add all data to server
`npm run data:import`

## To delete all data from server
`npm run data:destroy`