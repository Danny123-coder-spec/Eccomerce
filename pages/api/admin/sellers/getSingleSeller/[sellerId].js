import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { deleteASeller, getASeller, updateaSeller } from "../../../../backend/controllers/sellerController";

const router = createRouter();

dbConnect();

router.get(getASeller);
router.put(updateaSeller);
router.delete(deleteASeller)

export default router.handler();