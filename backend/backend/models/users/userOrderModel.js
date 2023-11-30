import mongoose from "mongoose";

const userOrderSchema = mongoose.Schema({
    orderNumber:{
        type:String,
        required:true,
        unique:true
    },
    orderStatus:{
        type:String,
        enum:['Pending','Processing','Delivered','Cancelled'],
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    detePurchased:{
        type:Date,
        default:Date.now
    },
});

userOrderSchema.pre('save', async function(next) {
    this.orderNumber = generateOrderNumber();
    next();
});

function generateOrderNumber(){
    return 'ORD' + Date.now
}


export default mongoose.models.UserOrder || mongoose.model('UserOrder', userOrderSchema)