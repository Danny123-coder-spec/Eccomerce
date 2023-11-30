import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { createPayout } from "../../../../../backend/controllers/vendor/payoutController";

const router = createRouter();

dbConnect();

router.post(createPayout);

export default router.handler();