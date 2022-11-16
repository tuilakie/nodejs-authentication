import {hashPassword,comparePassword} from "../utils/passwordHashing";
import { createRefreshToken } from "../services/auth.service";
import {createUser, getUserByEmail, getUsers} from "../services/user.service";
import {Request, Response, NextFunction} from "express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await createUser(email,hashedPassword);
        // const {accessToken, refreshToken} = await createRefreshToken(newUser.id);
        return res.status(201).json({
            message: 'User created successfully',
            data: newUser,
            // accessToken,
            // refreshToken
        });
    } catch (error) {
        next(error);
    }
}
