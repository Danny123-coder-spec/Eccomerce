import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const vendorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }

},{timestamps:true});

vendorSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})

vendorSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


export default mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);