import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { deleteProductById, getaProduct, updateProductById } from "../../../../backend/controllers/admin/productController";


const router = createRouter();

dbConnect();

router.put(updateProductById)
router.get(getaProduct)
router.delete(deleteProductById);

export default router.handler();