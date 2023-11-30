import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product_id:{
     type:mongoose.Schema.Types.ObjectId,
     required:true
  },
  quantity: {
    type: Number, 
    required: true 
   },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
     required: true 
   },
}, {timestamps:true});

export default mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);