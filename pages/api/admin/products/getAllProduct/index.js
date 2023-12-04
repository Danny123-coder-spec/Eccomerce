import { createRouter } from "next-connect";

import { getAllProducts } from "../../../../../backend/backend/controllers/admin/productController";
import dbConnect from "../../../../../backend/backend/config/dbConfig";

const router = createRouter();

dbConnect();

router.get(getAllProducts);

export default router.handler();