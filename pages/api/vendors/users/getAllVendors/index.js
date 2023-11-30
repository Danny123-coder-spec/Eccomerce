import { createRouter } from "next-connect";

import { getAllVendors } from "../../../../../backend/controllers/vendor/vendorController";
import dbConnect from "../../../../../backend/config/dbConfig";

const router = createRouter();

dbConnect();

router.get(getAllVendors);

export default router.handler();