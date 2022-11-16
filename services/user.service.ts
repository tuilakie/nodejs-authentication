import {
    hashPassword,
    comparePassword
} from "../utils/passwordHashing";

import { User } from "@prisma/client";
import db from "../utils/db";

export const createUser = async (email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    return await db.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    });
}

export const getUserByEmail = async (email: string) => {
    return await db.user.findUnique({
        where: {
            email
        }
    });
}

// get all users
export const getUsers = async () => {
    return await db.user.findMany();
}

