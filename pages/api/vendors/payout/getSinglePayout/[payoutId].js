import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import {  deletePayout, getSinglePayout, updatePayout } from "../../../../../backend/controllers/vendor/payoutController";

const router = createRouter();

dbConnect();

router.get(getSinglePayout);
router.put(updatePayout);
router.delete(deletePayout);

export default router.handler();