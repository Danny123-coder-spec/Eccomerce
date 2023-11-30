import mongoose from "mongoose";

const paymentRequestSchema = mongoose.Schema({
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vendor',
        required:true

    },

    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Accepted', 'Pending', 'Processing'],
        default:'Pending'
    },
    message:{
        type:String,
        required:true
    },
    paymentRequestDate:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.models.PaymentRequest || mongoose.model('PaymentRequest', paymentRequestSchema)