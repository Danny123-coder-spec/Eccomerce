import Seller from '../../models/admin/sellerModel'

// Assuming a seller already exist

const createSeller= async (req, res) => {
    try {
        const {sellerName, shopName,currentPackage, balance, shopPublished} = req.body;

        const existingSeller = await Seller.findOne({sellerName});
        if(existingSeller) {
            return res.json({message:'Seller with this name already exists', status:400})
        };

        const newSeller = new Seller(req.body);
        res.json({message:'Seller successfully created',seller:newSeller,  status:201});
        await newSeller.save();
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error);
    };
};

// Get all sellers

const getAllSellers = async(req, res) => {
    
    try {
        const getAllSellers = await Seller.find();
        res.json(getAllSellers);
        console.log(getAllSellers)
      } catch (error) {
        res.status(500).json({message:'Something went wrong!Please try again'});
        throw new Error(error);
      }
};

const getASeller = async (req, res) => {
    const id = req?.query?.pid;
    console.log(id);
    try {
        const getASeller = await Seller.findById(id);
        res.json(getASeller);
    } catch (error) {
        throw new Error(error)
    }
};

// Update a Single Seller
const updateaSeller = async(req,res) => {
    const id = req?.query?.pid;
    console.log(id)
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {new:true});
        
        if(!updatedSeller) {
            return res.json({message:'Seller not found', status:404});
        }
        res.json(updatedSeller);
    } catch (error) {
        console.log(error);
        res.json({message:"Internal Serve Error", status:500})
    }
};


// Delete A Seller

const deleteASeller = async(req, res) => {
    const id = req?.query?.id;
    console.log(id);

    try {
        const deletedSeller = await Seller.findByIdAndDelete(id);
        return res.json(deletedSeller);
    } catch (error) {
        console.log(error);
        res.json({message:'Internal Server Error', status:500})
    }
}

export {createSeller, getAllSellers, getASeller, updateaSeller, deleteASeller}