import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { getAllEarnings } from "../../../../../backend/controllers/vendor/earningsController";

const router = createRouter();

dbConnect();

router.get(getAllEarnings);

export default router.handler();