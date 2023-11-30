import VendorRefund from '../../models/vendor/refundModel'

const createVendorRefund = async(req, res) => {
    const {vendorId, orderNumber,shopName,productDetails,amount, status} = req.body;

    try {
        const newRefund = new VendorRefund({
            vendorId, orderNumber,shopName,productDetails,amount, status
        });

        await newRefund.save();
        res.json({message:'Refund Successful', status:200, refund:newRefund})
        
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
          
    }

}

// Get all vendorRefunds

const getAllVendorRefunds = async(req, res) => {
    try {
        const getAllRefunds = await VendorRefund.find();
        res.json(getAllRefunds);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Get Refund By Id

const getRefundById = async(req, res) => {
    const id = req?.query?.refundId;
    try {
        const singleRefund = await VendorRefund.findById(id);
        res.json(singleRefund);

        if(!singleRefund) {
            return res.json({message:'Refund not found', status:404})
        }
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Delete a refund
const deleteRefundById = async(req, res) => {
    const id = req?.query?.refundId;
    try {
        const deleteRefund = await VendorRefund.findByIdAndDelete(id);
        res.json(deleteRefund);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Update a refund
const updateARefundById = async(req, res) => {
    const id = req?.query?.refundId;
    try {
        const updatedRefund = await VendorRefund.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updatedRefund);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}



export {createVendorRefund, getAllVendorRefunds, getRefundById, deleteRefundById, updateARefundById}