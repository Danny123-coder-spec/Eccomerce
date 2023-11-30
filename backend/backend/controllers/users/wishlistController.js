import Wishlist from "../../models/users/wishlistModel";

const createWishList = async(req, res) => {
   const {user, product} = req.body;
   try {
      const newWishlist = new Wishlist({
        user,
        product
      });

      await newWishlist.save();
      res.json({message:'Wishlist successfully created', status:201, wishlist:newWishlist})
   } catch (error) {
    req.json({message:'Internal Server error'});
    console.log(error.message)
   }
}

export {createWishList}