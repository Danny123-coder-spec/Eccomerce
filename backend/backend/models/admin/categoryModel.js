
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  imageUrl: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  featured:{
    type:Boolean,
    default:false
  }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);


