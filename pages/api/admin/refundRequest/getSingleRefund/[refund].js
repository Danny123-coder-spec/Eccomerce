import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { deleteARefund, getARefund, updateARefund } from "../../../../backend/controllers/admin/refundController";

const router = createRouter();

dbConnect();

router.get(getARefund);
router.delete(deleteARefund);
router.put(updateARefund);

export default router.handler();