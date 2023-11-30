import { createRouter } from "next-connect";
import dbConnect from "../../../../../backend/config/dbConfig";
import { authVendor } from "../../../../../backend/controllers/vendor/vendorController";

const router = createRouter();

dbConnect();

router.post(authVendor);

export default router.handler();