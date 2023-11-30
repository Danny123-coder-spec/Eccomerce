import {createRouter} from 'next-connect'
import dbConnect from '../../../backend/config/dbConfig'
import { createCategory } from '../../../backend/controllers/categoryController';

const router = createRouter()

dbConnect();

router.post(createCategory);


export default router.handler();

