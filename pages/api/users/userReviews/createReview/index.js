import { createRouter } from "next-connect";
import { createReview } from "../../../../../backend/backend/controllers/users/userReviewsController";
import dbConnect from "../../../../../backend/backend/config/dbConfig";


const router = createRouter();

dbConnect();

router.post(createReview);

export default router.handler();