import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true
    },
    images:[
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },   
    sale_price:{
      type:Number,
      required:true,
    },
    tags: {
      type: String,
      default: [],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);


