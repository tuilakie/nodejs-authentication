import { Response } from "express";

export interface IResponse {
    status: number;
    message: string;
    data?: any;
}