import generateToken from '../../config/jwToken';
import Vendor from '../../models/vendor/vendorSchema'

const registorVendor = async(req, res) => {
    const email  = req.body.email;
    const findVendor = await Vendor.findOne({email:email});

    if(!findVendor) {
        // create a new vendor
        const createVendor = await Vendor.create(req.body);
        res.json(createVendor);
    } else {
        // Vendor already exists
        res.json({message:'Vendor already exists', status:400})
    }

    // try {
    //     res.json({message:'success', status:200})
    // } catch (error) {
    //     res.json({message:'Internal Server Error', status:500})
    //     console.log(error.message)
    // }

}

// login a vendor

const authVendor = async(req, res) => {
    const { email, password } = req.body;
    try {
        const findVendor = await Vendor.findOne({email});
        if(findVendor && (await findVendor.isPasswordMatched(password))){
            res.json({
                _id:findVendor?._id,
                email:findVendor?.email,
                token:generateToken(findVendor?._id)
            });
        }

    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Get all vendors

const getAllVendors = async(req, res) => {
    try {
        const allVendors = await Vendor.find();
        res.json(allVendors);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// get a Single Vendor

const getaSingleVendor = async(req, res) => {
    const id = req?.query?.vendorId;
    try {
        const singleVendor = await Vendor.findById(id);
        res.json(singleVendor);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Delete a vendor

const deleteAVendor = async(req, res) => {
    const id = req?.query?.vendorId;
    try {
        const deleteVendor = await Vendor.findByIdAndDelete(id);
        res.json(deleteVendor);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Update a Vendor

const updateAVendor = async(req, res) => {
    const id = req?.query?.vendorId;
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updatedVendor);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

export {registorVendor, authVendor, getAllVendors, getaSingleVendor, deleteAVendor, updateAVendor}