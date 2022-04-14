import {Request, Response} from "express";

export default interface AwardControllerI {
    awardTuitByUser (req: Request, res: Response): void;
};