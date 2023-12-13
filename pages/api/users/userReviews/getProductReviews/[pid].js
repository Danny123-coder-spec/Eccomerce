import { createRouter } from "next-connect";
import {  getProductReviews } from "../../../../../backend/backend/controllers/users/userReviewsController";
import dbConnect from "../../../../../backend/backend/config/dbConfig";


const router = createRouter();

dbConnect();

router.get(getProductReviews);

export default router.handler();