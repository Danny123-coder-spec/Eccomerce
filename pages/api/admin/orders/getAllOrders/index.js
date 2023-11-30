import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { getAllOrders } from "../../../../backend/controllers/admin/OrderController";

const router = createRouter();

dbConnect();

router.get(getAllOrders);

export default router.handler();