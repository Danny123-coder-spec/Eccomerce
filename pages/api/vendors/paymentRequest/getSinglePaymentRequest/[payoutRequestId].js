import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { deletePaymentRequest, getSinglePayment, updatePaymentRequest } from "../../../../../backend/controllers/vendor/payoutRequestController";

const router = createRouter();

dbConnect();

router.get(getSinglePayment);
router.put(updatePaymentRequest);
router.delete(deletePaymentRequest);

export default router.handler();