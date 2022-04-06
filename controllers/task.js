/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

import asyncHandler from 'express-async-handler';
import Task from '../models/task.js';

const createTask = asyncHandler(async (req, res) => {
    const task = new Task(req.body)
    task.save((err, data) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error while saving, please try again'
            })
        }
        res.json({ data });
    })
});

const listOwnTasks = asyncHandler(async (req, res) => {
    const owner = req.body.owner;
    Task.find({ owner }, (err, tasks) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error while reteriving the tasks'
            });
        }
        return res.send({
            success: true,
            tasks
        });
    });
});

const removeTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.taskId);
    
    if(task) {
        await task.remove()
        res.json({ message: 'Task deleted' })
    } else {
        res.status(404)
        res.json({ message: 'Task not Found' })
    }
});

export {
    createTask,
    listOwnTasks,
    removeTask,
}
