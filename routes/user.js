/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

import express from 'express'
const router = express.Router();

import { 
    signup,
    signin
} from '../controllers/user.js';

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
