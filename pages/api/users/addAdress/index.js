import { createRouter } from "next-connect";

import dbConnect from "../../../../backend/backend/config/dbConfig";
import addAddress from "../../../../backend/backend/controllers/users/userAdressController";

const router = createRouter();

dbConnect();

router.post(addAddress)

export default router.handler();