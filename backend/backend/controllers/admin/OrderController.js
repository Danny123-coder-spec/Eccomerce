// controllers/orderController.js
import Order from '../../models/admin/OrderModel'
// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      products,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username'); // Populate user details

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { createOrder, getAllOrders };
