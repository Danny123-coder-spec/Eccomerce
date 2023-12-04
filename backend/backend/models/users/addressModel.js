import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      addressLine: {
        type: String,
        required:true
      },
    
      phone: {
        type: String,
        required: true
      }
    
    


})

export default mongoose.models.Address || mongoose.model('Address', addressSchema)