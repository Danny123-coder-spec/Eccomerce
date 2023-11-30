import { createRouter } from "next-connect";

import { createUserOrder } from "../../../../../backend/controllers/users/userOrderController";
import dbConnect from "../../../../../backend/config/dbConfig";

const router = createRouter();

dbConnect();

router.post(createUserOrder);

export default router.handler();