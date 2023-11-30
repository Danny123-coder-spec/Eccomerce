import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { deleteRefundById, getRefundById, updateARefundById } from "../../../../../backend/controllers/vendor/refundController";

const router = createRouter();

dbConnect();

router.get(getRefundById);
router.delete(deleteRefundById);
router.put(updateARefundById);

export default router.handler();