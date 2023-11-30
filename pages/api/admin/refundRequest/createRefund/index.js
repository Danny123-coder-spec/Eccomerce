import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { createRefund } from "../../../../backend/controllers/admin/refundController";

const router = createRouter();

dbConnect();

router.post(createRefund)

export default router.handler();