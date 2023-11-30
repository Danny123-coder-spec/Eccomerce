import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { getAllSellers } from "../../../../backend/controllers/admin/sellerController";

const router = createRouter();

dbConnect();

router.get(getAllSellers)

export default router.handler();