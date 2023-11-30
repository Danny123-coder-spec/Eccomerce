
import Category from "../../models/admin/categoryModel";

// Create a new Category

const createCategory = async (req, res) => {
  // try {
  try {
    // const newCategory = await Category.create(req.body);
    // res.json(newCategory);
    // await newCategory.save();
    // if (newCategory) {
    //   res.json({ message: 'Category Created Successully', status: 200 })
    // } else {
    //   res.json({ status: 400, error: 'Failed to created Category' })
    // }
    const newCategory = new Category({
      ...req?.body
    });
    console.log(newCategory);
    
    if(newCategory){
      await newCategory.save();
      return res.json({message:"Category created successfully", status:200, category:newCategory})
    }
  } catch (error) {
    res.json({ message: 'Internal Server Error' })
    throw new Error(error);

  }
};

// Get A Category

const getaCategory = async (req, res) => {
  const id = req?.query?.categoryId
  // console.log(req?.query) 
  console.log(id)
  try {
    const findCategory = await Category.findById(id);
    return res.json(findCategory);
  } catch (error) {
    throw new Error(error);

  }
}
// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const getAllCategories = await Category.find();
    res.json(getAllCategories);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!Please try again' })
    throw new Error(error);
  }
}

// Update Category

const updateCategory = async (req, res) => {
  const id = req?.query?.categoryId
  console.log(id)
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(updatedCategory);

    console.log(id)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

// Delete a Category

const deleteACategory = async (req, res) => {
  const id = req?.query?.categoryId;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}





export { createCategory, getAllCategories, updateCategory, getaCategory, deleteACategory };