import { createRouter } from "next-connect";
import { NextResponse } from "next/server";
import dbConnect from "../../../../backend/config/dbConfig";
import { createSeller } from "../../../../backend/controllers/admin/sellerController";

const router = createRouter();

dbConnect();

router.post(createSeller);

export default router.handler();
