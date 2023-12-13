import { createRouter } from "next-connect";
import { allReviews } from "../../../../../backend/backend/controllers/users/userReviewsController";
import dbConnect from "../../../../../backend/backend/config/dbConfig";


const router = createRouter();

dbConnect();

router.get(allReviews);

export default router.handler();