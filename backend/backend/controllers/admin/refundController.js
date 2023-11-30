import Refund from '../../models/admin/refundModel'

// Create a refundRequest
const createRefund = async (req, res) => {
    try {
        const addRefund = await Refund.create(req.body);
        res.json(addRefund);
        await addRefund.save();
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message);
    }
}

// Get all request

const getAllRefunds = async (req, res) => {
    try {
        const getAllRefunds = await Refund.find();
        res.json(getAllRefunds);

    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message);
    }
}

const getARefund = async (req, res) => {
    const id = req?.query?.refund;
    try {
        const findARefund = await Refund.findById(id);
        res.json(findARefund);
        if(!findARefund) {
            return res.json({message:'Refund Request not found', status:404})
        }
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message);
    }
}

const deleteARefund = async(req, res) => {
    const id = req?.query?.refund;
    try {
        const deleteRefund = await Refund.findByIdAndDelete(id);
        res.json(deleteRefund);
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message);
    }
}

const updateARefund = async(req, res) => {
    const id = req?.query?.refund;
    try {
        const updatedRefund = await Refund.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updatedRefund)
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message);
    }
}

export { createRefund, getAllRefunds, getARefund, deleteARefund, updateARefund }