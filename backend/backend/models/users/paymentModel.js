import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
      paymentMethodId:{
        type:String,
        required:true
      },
      paymentMethod:{
        type:String,
        required:true
      },
      status:{
        type:String,
        default:"Pending"
      }

});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);