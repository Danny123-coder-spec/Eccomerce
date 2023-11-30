import CartItem from '../../models/admin/addToCartModel'

const addToCart = async(req, res) => {
    
const {product_id, quantity} = req.body;
  try {
    const addCartItem = await CartItem.findOne({
        product_id,
        user_Id:req?.user?.id
    });

    if(addCartItem) {
        addCartItem.quantity += quantity;
        await addCartItem.save(); 
    } else {
        await CartItem.create({
            product_id,
            quantity,
            user_id:req?.user?.id
        })
    }
    console.log(req.body)
    return res.json({message:'Item added to cart successfully', status:201})
  } catch (error) {
    console.log('Error adding item to cart', error.message)
    res.json({message:'Internal Server Error', status:500})
  }
}

export default addToCart