import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { getAllReviews } from "../../../../../backend/controllers/admin/adminReview";

const router = createRouter();

dbConnect();

router.get(getAllReviews)

export default router.handler();