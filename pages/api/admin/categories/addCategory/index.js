import {createRouter} from 'next-connect'

import dbConnect from '../../../../../backend/backend/config/dbConfig';
import { createCategory } from '../../../../../backend/backend/controllers/admin/categoryController';


const router = createRouter()

dbConnect();


router.post(createCategory);


export default router.handler();

