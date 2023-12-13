import mongoose from "mongoose";

const sellerModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },


})

export default mongoose.models.Seller || mongoose.model("Seller", sellerModel);