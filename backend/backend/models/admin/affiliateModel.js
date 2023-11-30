import mongoose from "mongoose";

const affiliateSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    referral_Code:{
        type:String,
        unique:true,
    },
    commission_earned:{
        type:Number,
        default:0
    }

});

export default mongoose.models.Affiliate || mongoose.model('Affiliate', affiliateSchema);