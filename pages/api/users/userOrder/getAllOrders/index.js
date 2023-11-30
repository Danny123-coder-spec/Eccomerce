import { createRouter } from "next-connect";
import { getAllUserOrders } from "../../../../../backend/controllers/users/userOrderController";
import dbConnect from "../../../../../backend/config/dbConfig";

const router = createRouter();

dbConnect();

router.get(getAllUserOrders);

export default router.handler();