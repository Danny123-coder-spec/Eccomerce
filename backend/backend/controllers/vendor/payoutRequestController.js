import PaymentRequest from '../../models/vendor/payoutRequestModel';

const createPayoutRequest = async(req, res) => {
    try {
        const {vendorId, amount, status, message} = req.body;

        const newPaymentRequest = new PaymentRequest({
            vendorId, amount, status, message
        });

        await newPaymentRequest.save();

        res.json({message:'Payment Request sent successfully', status:201, paymentRequest:newPaymentRequest})
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Get all payment Request

const getAllPaymentRequest = async(req, res) => {
    try {
        const allPaymentRequest = await PaymentRequest.find();
        res.json(allPaymentRequest);
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
    }
}

// Get a single Payment Request

const getSinglePayment = async(req, res) => {
    const _id = req?.query?.payoutRequestId;
    try {
        const singlePayment = await PaymentRequest.findById(_id);
        res.json(singlePayment);

        if(!singlePayment) {
            return res.json({message:'Payment Request not found', status:404})
        }
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
        
    }
}

// Update a payment Request 

const updatePaymentRequest = async(req, res) => {
    const _id = req?.query?.payoutRequestId;
    try {
        const updatedPaymentRequest = await PaymentRequest.findByIdAndUpdate(_id, req.body, {new:true});
        res.json(updatedPaymentRequest);
        
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
        
    }
}

// Delete a payment Request 

const deletePaymentRequest = async(req, res) => {
    const _id = req?.query?.payoutRequestId;
    try {
        const deletePaymentRequest = await PaymentRequest.findByIdAndDelete(_id);
        res.json(deletePaymentRequest)
    } catch (error) {
        res.json({message:'Internal Server Error', status:500});
        console.log(error.message);
        
    }
}

export {createPayoutRequest, getAllPaymentRequest, getSinglePayment, updatePaymentRequest, deletePaymentRequest}