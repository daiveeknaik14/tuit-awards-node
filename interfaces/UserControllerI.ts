import {Request, Response} from "express";

/**
 * @file Declares API for User controller
 */
export default interface UserControllerI {
    findAllUsers (req: Request, res: Response): void;
    findUserById (req: Request, res: Response): void;
    createUser (req: Request, res: Response): void;
    updateUser (req: Request, res: Response): void;
    deleteUser (req: Request, res: Response): void;
    deleteAllUsers (req: Request, res: Response): void;
    getCoinsWithUser (req: Request, res: Response): void;
    increaseCoinsWithUser (req: Request, res: Response): void;
};