# MONGOOSE GUIDE

## Install Mongoose at root
`npm i mongoose`

---

## Connect to Database using Mongoose

### Create a folder called config in backend folder

### Create a file called db.js in config folder and add following codes in it
#### We use async/await here because data returned from MongoDB will be a promise
```
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;
```

### Call this function (connectDB) in server.js right above 'const app = express();'
```
import connectDB from './config/db.js';

connectDB();
```

---

## Mongoose model

### Creating Schema and export as a model

1. Create folder called models in backend
2. Create model file (e.g. productModel.js)
3. Add following codes in it
```
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // this user is who actually rates
    user: {
      // ObjectId is special type of object from MongoDB. This will relate user id to a product
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // user is referencing to User on MongoDB
      ref: 'User',
    },
    // you could just use name: 'string' if you don't need another options in it
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    // we created this one outside of rest, because this one we want to create automatically when we create a product. This will add created_at
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    // this user is related to the one who creates product (admin). Different than above user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      // for image we will provide image path, so it's string here
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // we add schema for reviews that we created above
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// here we create model using above schema
const Product = mongoose.model('Product', productSchema);

export default Product;
```