import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide rating value'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide comment!'],
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    name: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    image: {
      type: String,
      required: [true, 'Please provide product image'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide product brand'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
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
    reviews: [reviewsSchema],
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
