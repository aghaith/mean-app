/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

import express from 'express'
import { userAuth } from '../controllers/user.js';

const router = express.Router();

import { 
    createTask,
    listOwnTasks,
    removeTask,
} from '../controllers/task.js';

router.post('/task/create', userAuth, createTask);
router.post('/tasks', userAuth, listOwnTasks);
router.delete('/task/:taskId', userAuth, removeTask);

export default router
