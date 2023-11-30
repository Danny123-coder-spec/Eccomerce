import {createRouter} from 'next-connect';

import dbConnect from '../../../../../backend/backend/config/dbConfig';
import { deleteACategory, getaCategory, updateCategory } from '../../../../../backend/backend/controllers/admin/categoryController';

const router = createRouter();

dbConnect();

router.get(getaCategory);
router.put(updateCategory);
router.delete(deleteACategory);

export default router.handler();