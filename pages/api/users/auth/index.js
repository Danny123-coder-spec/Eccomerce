import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/backend/config/dbConfig";
import { authUser} from "../../../../backend/backend/controllers/users/userController";

const router = createRouter();

dbConnect();

router.post(authUser);

export default router.handler();
