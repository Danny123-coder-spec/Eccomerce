import { createRouter } from "next-connect";
import dbConnect from "../../../../backend/config/dbConfig";
import { createWishList } from "../../../../backend/controllers/users/wishlistController";

const router = createRouter();

dbConnect();

router.post(createWishList);


export default router.handler();