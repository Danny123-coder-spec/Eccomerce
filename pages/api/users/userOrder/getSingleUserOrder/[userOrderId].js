import { createRouter } from "next-connect";
import { deleteUserOrder, getASingleUserOrder, updateUserOrder } from "../../../../../backend/controllers/users/userOrderController";
import dbConnect from "../../../../../backend/config/dbConfig";

const router = createRouter();

dbConnect();

router.get(getASingleUserOrder);
router.delete(deleteUserOrder);
router.put(updateUserOrder);


export default router.handler();