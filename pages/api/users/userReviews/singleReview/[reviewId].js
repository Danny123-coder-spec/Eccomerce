import { createRouter } from "next-connect";
import { reviewSingle } from "../../../../../backend/backend/controllers/users/userReviewsController";
import dbConnect from "../../../../../backend/backend/config/dbConfig";


const router = createRouter();

dbConnect();

router.get(reviewSingle);

export default router.handler();