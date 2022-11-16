import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (user: any) => {
    const payload = {
        id: user.id,
        iat: Math.floor(Date.now() / 1000)
    }
    const SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret';
    // expiresIn 5 minutes
    return jwt.sign(payload, SECRET, { expiresIn: '5m' });
}

export const generateRefreshToken = (user: any) => {
    const payload = {
        id: user.id,
        iat: Math.floor(Date.now() / 1000)
    }
    const SECRET = process.env.REFRESH_TOKEN_SECRET || 'secret';
    // expiresIn 7 days
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export const generateToken = (user : any) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
        accessToken,
        refreshToken
    }
}

// check expired token
export const isExpiredToken = (token: string) => {
    const decoded = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    // return decoded && decoded. < currentTime;
}

