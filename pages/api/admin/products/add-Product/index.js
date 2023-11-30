import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { createProduct } from "../../../../../backend/controllers/admin/productController";

const router = createRouter();

dbConnect();

router.post(createProduct);

export default router.handler();