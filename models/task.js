/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
    },
    owner: {
        type: String,
        required: true,
    }
});

const Task = mongoose.model('Task', taskSchema)

export default Task;
