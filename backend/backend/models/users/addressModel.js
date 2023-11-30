import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    addressName:{
        type:String,
        required:true
    }

})

export default mongoose.models.Address || mongoose.model('Address', addressSchema)