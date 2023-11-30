import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { createPayoutRequest } from "../../../../../backend/controllers/vendor/payoutRequestController";

const router = createRouter();

dbConnect();

router.post(createPayoutRequest);

export default router.handler();