import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { deleteAnEarning, getAnEarning, updateAnEarning } from "../../../../../backend/controllers/vendor/earningsController";

const router = createRouter();

dbConnect();

router.get(getAnEarning);
router.delete(deleteAnEarning);
router.put(updateAnEarning);

export default router.handler();