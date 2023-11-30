import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { getAllRefunds } from "../../../../backend/controllers/admin/refundController";

const router = createRouter();

dbConnect();

router.get(getAllRefunds);

export default router.handler();