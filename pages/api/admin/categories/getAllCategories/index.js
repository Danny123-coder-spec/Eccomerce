import { createRouter } from "next-connect";

import dbConnect from "../../../../../backend/backend/config/dbConfig";
import { getAllCategories } from "../../../../../backend/backend/controllers/admin/categoryController";

const router = createRouter();

dbConnect();

router.get(getAllCategories);

export default router.handler();