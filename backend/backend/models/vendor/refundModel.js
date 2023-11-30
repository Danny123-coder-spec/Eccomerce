import mongoose from "mongoose";

const refundVendorSchema = mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor',
        required:true
    },
    orderNumber:{
        type:Number,
        required:true
    },
    shopName:{
        type:String,
        required:true
    },
    productDetails:[
        {
            productId:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true,
        },
    ],
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Pending', 'Processing','Accepted'],
        default:'Pending'
    },
}, {timeStamps:true})

export default mongoose.models.VendorRefund || mongoose.model('VendorRefund', refundVendorSchema)