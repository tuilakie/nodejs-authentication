import { RefreshToken, User } from "@prisma/client";
import db from "../utils/db";
import {generateRefreshToken, generateAccessToken } from "../utils/jwt";


export const createRefreshToken = async (userId: string) => {
    const refreshToken = generateRefreshToken(userId);
    return await db.refreshToken.create({
        data: {
            Token: refreshToken,
            userId: userId
        }
    });
}

export const getRefreshToken = async (userId: string) => {
   const refreshToken = await db.refreshToken.findMany({
         where: {
              userId: userId,
              revoked: false
         },
            orderBy: {
                createdAt: 'desc'
            },
            take: 1
    });
    return refreshToken;
}

export const revokeRefreshToken = async (userId: string) => {
    return await db.refreshToken.updateMany({
        where: {
            userId: userId,
            revoked: false
        },
        data: {
            revoked: true
        }
    });
}

export const extendAccessToken = async (refreshToken: string, userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        return false;
    }
    let verifyRefreshToken = await getRefreshToken(userId).then((data) => {
        return data[0].Token === refreshToken;
    });
    const newAccessToken = verifyRefreshToken ? generateAccessToken(userId) : false;
    return newAccessToken;
}

const extendRefreshToken = async (refreshToken: string, userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        return false;
    }
    let verifyRefreshToken = await getRefreshToken(userId).then((data) => {
        return data[0].Token === refreshToken;
    });
    const newRefreshToken = verifyRefreshToken ? generateRefreshToken(userId) : false;
    return newRefreshToken;
}


