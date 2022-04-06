/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('DB CONNECTION ERROR: ', error);
        process.exit(1);
    }
}

export default connectDB;
