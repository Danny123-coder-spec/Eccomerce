import { createRouter } from "next-connect";
import { deleteOrder, updateAnOrder } from "../../../../backend/controllers/admin/OrderController";

const router = createRouter();

router.put(updateAnOrder)
router.delete(deleteOrder);

export default router.handler();