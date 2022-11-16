import CryptoJS from "crypto-js"

export const hashPassword = async (password:string) => {
    return await CryptoJS.SHA256(password).toString();   
}

export const comparePassword = async (password:string, hashedPassword:string) => {
    return await CryptoJS.SHA256(password).toString() === hashedPassword;
}