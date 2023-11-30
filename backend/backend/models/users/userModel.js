import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["customer", "admin", "vendor"],
        default:"customer"
    }, 
    cart:{
        type:Array,
        default:[]
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
   

}, {timestamps:true}); 

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;