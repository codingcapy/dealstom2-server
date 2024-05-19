import { Request, Response } from "express";
export interface IDecodedUser {
    userId: number;
}
export declare function validateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function decryptToken(req: Request, res: Response): Promise<"" | undefined>;
export declare function createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getUser(req: Request, res: Response): Promise<void>;
export declare function createBudget(req: Request, res: Response): Promise<void>;
export declare function getBudget(req: Request, res: Response): Promise<void>;
export declare function createAddress(req: Request, res: Response): Promise<void>;
