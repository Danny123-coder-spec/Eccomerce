import Payout from '../../models/vendor/payoutModel';

const createPayout = async(req, res) => {
    try {
        const {vendorId, amount, paymentMethod,status,  payoutDate} = req.body;
        const newPayout = new Payout({
            vendorId, amount, paymentMethod,status,  payoutDate
        });

        await newPayout.save();
        res.json({message:'Payout Sucessfull', payout:newPayout})
        
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
        
    }
}

// Get all payout records

const getAllPayouts = async(req, res) => {
    try {
        const allPayouts = await Payout.find();
        res.json(allPayouts);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Get Payout By Id

const getSinglePayout = async(req, res) => {
    const id = req?.query?.payoutId;
    try {
        const singlePayout = await Payout.findById(id);
        res.json(singlePayout);

        if(!singlePayout) {
            return res.json({message:'Payout not found', status:404})
        }
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message)
        
    }
}

// Update a payout record
const updatePayout = async(req, res) => {
    const id = req?.query?.payoutId;
    try {
        const updatedPayment = await Payout.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updatedPayment)
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message)
    }
}

// Delete a payout record

const deletePayout = async(req, res) => {
    const id = req?.query?.payoutId;
    try {
        const deletedPayment = await Payout.findByIdAndDelete(id);
        res.json(deletedPayment)
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message)
    }
}

export {createPayout, getAllPayouts, getSinglePayout, updatePayout, deletePayout}