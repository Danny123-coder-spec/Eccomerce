import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { registorVendor } from "../../../../../backend/controllers/vendor/vendorController";

const router = createRouter();

dbConnect();

router.post(registorVendor);

export default router.handler();