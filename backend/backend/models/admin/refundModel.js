import mongoose from "mongoose";

const refundStatusEnum = ["Accepted", "Pending", "Processing"]

const refundSchema = new mongoose.Schema({
    order_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    }, 
    shopName:{
        type:String,
        required:true,
    },
    productDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    refundAmount:{
        type:Number,
        required:true
    },
    
    refundStatus:{
        type:String,
        enum:refundStatusEnum,
        default:'Pending',
    },
    requestDate:{
        type:Date,
        default:Date.now
    }
}, );

export default mongoose.models.Refund || mongoose.model('Refund', refundSchema);