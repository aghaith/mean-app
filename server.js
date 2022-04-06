/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

// Bring in all dependencies
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

// import routes
import userRoutes from './routes/user.js';
import taskRoutes from './routes/task.js';

dotenv.config();

// connect to db
connectDB();

const __dirname = path.resolve();

// Intialize app with express
const app = express();

// app middlewares
app.use(express.json());
app.use(cors());

//Static public folder
app.use(express.static(path.join(__dirname, 'frontend/public')));

// middleware
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

const _PORT = process.env.PORT;

app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}`);
});
