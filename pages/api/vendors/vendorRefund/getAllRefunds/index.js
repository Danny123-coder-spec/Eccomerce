import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { getAllVendorRefunds } from "../../../../../backend/controllers/vendor/refundController";

const router = createRouter();

dbConnect();

router.get(getAllVendorRefunds);

export default router.handler();