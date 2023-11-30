import generateToken from '../../config/jwToken';
import User from '../../models/users/userModel'

// Register an user
const registerUser = async (req, res) => {
    const email = req.body.email;
    const role = req.body.role;
    const findUser = await User.findOne({ email: email, role:role });
    if (!findUser) {
        // create a new user
        const newUser = await User.create(req.body);
        res.json({message:'User created successfully', status:200, user:newUser});
    } else {
        // user already exits
        res.json({ message: 'User already Exists', status: 400 })
    }

}

// Authenticate a user

const authUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
       const findUser = await User.findOne({email})
       if(findUser && (await findUser.isPasswordMatched(password))) {
         res.json({message:"Login successfull", status:200, auth:{
            _id:findUser?._id,
            email:findUser?.email,
            role:findUser?.role,
            token:generateToken(findUser?._id)
         }})
       }

       if(!findUser) {
        res.json({message:'Invalid Username or password', status:400})
       }
    } catch (error) {
        res.json({message:'Internal Server Error', status:500})
        console.log(error.message)
    }

}

// Get all users
const getAllUsers = async(req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers)
    } catch (error) {
        res.json({message:'Internal Server Error', status:500})
        console.log(error.message);
    }
}

// Get A Single User

const getSingleUser = async(req, res) => {
    const _id = req?.query?.userId;
    try {
        const singleUser = await User.findById(_id);
        res.json(singleUser);

        if(!singleUser) {
            return res.json({message:'Vendor not found', status:404})
        }
    } catch (error) {
        res.json({message:'Internal Server Error', status:500})
        console.log(error.message);
    }
}


const deleteAUser = async(req, res) => {
    const _id = req.query?.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(_id);
        res.json(deletedUser);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500})
        console.log(error.message);
    }

}

// Update a User

const updateaUser = async (req, res) => {
    const _id = req?.query?.userId;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id, 
            req.body,
            {new:true}
        );
        res.json(updatedUser);
        if(!updatedUser){
            return res.json({message:'User not found', status:404})
        }
    } catch (error) {
        res.json({message:'Internal Server Error', status:500})
        console.log(error.message);
    }
}



export { registerUser, authUser, getAllUsers,getSingleUser, deleteAUser, updateaUser }