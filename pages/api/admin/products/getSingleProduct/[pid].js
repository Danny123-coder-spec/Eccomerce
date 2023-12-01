import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/backend/config/dbConfig";
import { getSingleUser } from "../../../../../backend/backend/controllers/users/userController";
import { deleteProductById, updateProductById } from "../../../../../backend/backend/controllers/admin/productController";



const router = createRouter();

dbConnect();

router.get(getSingleUser);
router.put(updateProductById);
router.delete(deleteProductById);

export default router.handler();