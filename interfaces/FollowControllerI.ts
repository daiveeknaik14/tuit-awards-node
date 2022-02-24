import {Request, Response} from "express";

/**
 * @file Declares API for Follow related controller methods
 */
export default interface FollowControllerI {
  findUsersFollowingUser (req: Request, res: Response): void;
  findUsersFollowedByUser (req: Request, res: Response): void;
  userFollowsUser (req: Request, res: Response): void;
  userUnfollowsUser (req: Request, res: Response): void;
};