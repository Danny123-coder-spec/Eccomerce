import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { earningsEntry } from "../../../../../backend/controllers/vendor/earningsController";

const router = createRouter();

dbConnect();

router.post(earningsEntry);

export default router.handler();