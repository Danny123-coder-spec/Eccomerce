import mongoose from "mongoose";

const sellerEnum = ["Premium", "Gold","Silver"];
const sellerSchema = mongoose.Schema({
    sellerName:{
        type:String,
        required:true,
        unique: true,
    },
    shopName:{
        type:String,
        required:true
    },
    currentPackage:{
        type:String,
        enum:sellerEnum,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
        default: 0,
    },
    shopPublished:{
        type:Boolean,
        required:true,
        default: false,
    }

})

export default mongoose.models.Seller || mongoose.model("Seller", sellerSchema);