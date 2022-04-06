/**
 * @Author: Abbas Ghaith <abbasg>
 * @Date: Saturday, April 2, 2022
 * @Email: aghaith@acksession.com
 */

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/user.js';

dotenv.config()

//Login
const signin = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = { email }

    //Check the user exists
    User.findOne(query, (err, user) => {

        //Error during exuting the query
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again'
            });
        }

        //No User match the search condition
        if (!user) {
            return res.send({
                success: false,
                message: 'Error, Account not found'
            });
        }

        //Check if the password is correct
        user.isPasswordMatch(password, user.password, (err, isMatch) => {

            //Invalid password
            if (!isMatch) {
                return res.send({
                    success: false,
                    message: 'Error, Invalid Password'
                });
            }

            //User is Valid
            const ONE_WEEK = 604800; //Token validtity in seconds

            //Generating the token
            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_WEEK });

            //User Is Valid
            //This object is just used to remove the password from the retuned fields
            let returnUser = {
                name: user.name,
                email: user.email,
                id: user._id
            }

            //Send the response back
            return res.send({
                success: true,
                message: 'You can login now',
                user: returnUser,
                token
            });
        });
    });
});

//Registeration
const signup = asyncHandler(async (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Failed to save the user'
            });
        }
        res.send({
            success: true,
            message: 'User Saved',
            user
        });
    })
});

const userAuth = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            return res.send({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }
    if(!token) {
        res.status(401)
        return res.send({
            success: false,
            message: 'Not authorized, no token'
        });
    }
});

export {
    signup,
    signin,
    userAuth,
}
