import { createRouter } from "next-connect";
import dbConnect from "../../../backend/config/dbConfig";
import addAffiliate from "../../../backend/controllers/admin/affiliateController";

const router = createRouter();

dbConnect();

router.post(addAffiliate)

export default router.handler();