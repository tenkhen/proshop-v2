import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // this user is who actually rates
    user: {
      // ObjectId is special type of object from MongoDB
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // user is coming from collection called 'User' on MongoDB
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
    // we add user here, because we need to create a product related to this user (admin)
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
    // we add schema for review that we created above
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
