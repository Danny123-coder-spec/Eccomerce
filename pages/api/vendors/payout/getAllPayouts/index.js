import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import {  getAllPayouts } from "../../../../../backend/controllers/vendor/payoutController";

const router = createRouter();

dbConnect();

router.get(getAllPayouts);

export default router.handler();