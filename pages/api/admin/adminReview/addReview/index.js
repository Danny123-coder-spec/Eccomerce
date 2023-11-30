import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { createReview } from "../../../../../backend/controllers/admin/adminReview";

const router = createRouter();

dbConnect();

router.post(createReview)

export default router.handler();