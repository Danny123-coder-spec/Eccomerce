import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/backend/config/dbConfig";
import {deleteAUser, getSingleUser, updateaUser} from "../../../../backend/backend/controllers/users/userController";

const router = createRouter();

dbConnect();

router.get(getSingleUser);
router.put(updateaUser);
router.delete(deleteAUser);

export default router.handler();