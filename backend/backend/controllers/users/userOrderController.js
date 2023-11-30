import UserOrder from '../../models/users/userOrderModel';
import generateOrderNumber from '../../models/users/userModel';

const createUserOrder = async (req, res) => {
    
    const {orderNumber, orderStatus, totalAmount } = req.body;
    try {
       
        const newUserOrder = new UserOrder({
            orderStatus, totalAmount, orderNumber
        });

        newUserOrder.orderNumber = generateOrderNumber();
        await newUserOrder.save();
        res.json({ message: 'User Order created successfully', status: 201, userOrder: newUserOrder });
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message)
    }
}

// Get ALL Orders 

const getAllUserOrders = async (req, res) => {
    try {
        const findAllOrders = await UserOrder.find();
        res.json(findAllOrders);
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message)
    }
};

// Get a single Order

const getASingleUserOrder = async (req, res) => {
    const id = req?.query?.userOrderId;
    try {
        const findSingleOrder = await UserOrder.findById(id);
        res.json(findSingleOrder);

        if (!findSingleOrder) {
            return res.json({ message: 'Order not found', status: 404 })
        }
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message)
    }
};

// Delete an Order

const deleteUserOrder = async (req, res) => {
    const id = req?.query?.userOrderId;
    try {
        const deletedUserOrder = await UserOrder.findByIdAndDelete(id);
        res.json(deletedUserOrder);
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message)
    }
}

// Update User Order

const updateUserOrder = async (req, res) => {
    const id = req?.query?.userOrderId;
    try {
        const updatedUserOrder = await UserOrder.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updatedUserOrder);
    } catch (error) {
        res.json({ message: 'Internal Server Error', status: 500 });
        console.log(error.message)

    }
}



export { createUserOrder, getAllUserOrders, getASingleUserOrder, deleteUserOrder, updateUserOrder }