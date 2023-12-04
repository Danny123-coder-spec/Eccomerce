import Payment from '../../models/users/paymentModel';

const addPayment = async (req, res) => {
    const {user, order, paymentMethodId, paymentMethod, status} = req?.body;
    try {
        const newPayment = new Payment({
            user,
            order,
            paymentMethodId,
            paymentMethod,
            status
        });
        
        console.log(newPayment);
        res.json({ message: 'Payment created successfully', status:200, payment:newPayment })
    } catch (error) {
        res.json({ message: 'Internal Server Error', status:500 })
        console.log(error.message);
    }
}

export default addPayment;