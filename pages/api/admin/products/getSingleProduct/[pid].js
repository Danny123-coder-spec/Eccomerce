import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/backend/config/dbConfig";
import { deleteProductById, getAProduct, updateProductById } from "../../../../../backend/backend/controllers/admin/productController";



const router = createRouter();

dbConnect();

router.get(getAProduct);
router.put(updateProductById);
router.delete(deleteProductById);

export default router.handler();