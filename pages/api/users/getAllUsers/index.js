import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/backend/config/dbConfig";
import {getAllUsers} from "../../../../backend/backend/controllers/users/userController";

const router = createRouter();

dbConnect();

router.get(getAllUsers);

export default router.handler();