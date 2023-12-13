import Product from "../../models/admin/productModel";
import Joi from "joi";

// const AddedNewProductSchema = Joi.object({
//   name: Joi.string().required(),
//   category: Joi.string().required(),
//   imageUrl: Joi.string(),
//   description: Joi.string().required(),
//   stock: Joi.number().required(),
//   price: Joi.number().required(),
//   sale_price: Joi.number().required(),
//   tags: Joi.number().required(),
//   ratings: Joi.string().required(),
//   reviews: Joi.number().required(),
// });

const createProduct = async (req, res) => {
  // console.log(req);
  try {
   
    const newProduct = new Product({
      ...req?.body,
    });

    console.log(newProduct);
    if (newProduct) {
      await newProduct.save();
      return res.json({
        message: "Product created successfully",
        status: 200,
        product: newProduct,
      });
    }
  } catch (error) {
    res.json({ message: "Internal server error", status: 500 });
    console.log(error.message);
  }
};

// Get A Product

const getAProduct = async (req, res) => {
  const id = req?.query?.pid;
  console.log(id);
  try {
    const singleProduct = await Product.findById(id);
    res.json(singleProduct);
  } catch (error) {
    console.log(error.message);
  }
};
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.json(getAllProducts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!Please try again" });
    console.log(error.message);
  }
};

// Update a product by ID

const updateProductById = async (req, res) => {
  const id = req?.query?.pid;
  console.log(id);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({message:'Product updated successfull', status:200, update:updatedProduct});

    console.log(id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Delete a product by ID

const deleteProductById = async (req, res) => {
  const id = req?.query?.pid;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Unable to delete product" });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Sever Error" });
  }
};

export {
  createProduct,
  getAllProducts,
  getAProduct,
  updateProductById,
  deleteProductById,
};
