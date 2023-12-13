import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
     
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
      type: String,
     
    },
    imageUrl:{
        type: String,
      },
    description: {
      type: String,
     
    },
    stock: {
      type: Number,
      
    },
    price:{
      type: Number,
      
    },   
    sale_price:{
      type:Number,
      
    },
    tags: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        rating: {
          type: Number,
         
        },
        comment: {
          type: String,
         
        },
      },
    ],
    
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);


