import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { getAllReviews } from "../../../../../backend/controllers/vendor/reviewController";

const router = createRouter();

dbConnect();

router.get(getAllReviews);

export default router.handler();