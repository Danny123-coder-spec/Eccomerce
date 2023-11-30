import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/backend/config/dbConfig";
import { registerUser } from "../../../../backend/backend/controllers/users/userController";

const router = createRouter();

dbConnect();

router.post(registerUser);

export default router.handler();
