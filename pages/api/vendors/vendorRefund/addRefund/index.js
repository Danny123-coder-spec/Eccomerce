import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { createVendorRefund } from "../../../../../backend/controllers/vendor/refundController";

const router = createRouter();

dbConnect();

router.post(createVendorRefund);

export default router.handler();