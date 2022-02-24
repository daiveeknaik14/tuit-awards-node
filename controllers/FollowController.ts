/**
 * @file Controller RESTful Web service API for follows resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowsController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/following to retrieve all the users followed by a user
  *     </li>
  *     <li>GET /api/users/:uid/followers to retrieve all the users following a user
  *     </li>
  *     <li>POST /api/users/:uid0/follows/:uid1 to record that a user followed a user
  *     </li>
  *     <li>DELETE /api/users/:uid0/follows/:uid1 to record that a user
  *     no longer follows a user</li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
  * @property {FollowController} followController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service API
      * @return FollowController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
             FollowController.followController = new FollowController();
             app.get("/api/users/:uid/following", FollowController.followController.findUsersFollowedByUser);
             app.get("/api/users/:uid/followers", FollowController.followController.findUsersFollowingUser);
             app.post("/api/users/:uidFollowing/follows/:uidFollowed", FollowController.followController.userFollowsUser);
             app.delete("/api/users/:uidFollowing/follows/:uidFollowed", FollowController.followController.userUnfollowsUser);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that followed a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user follows objects
      */
     findUsersFollowingUser = (req: Request, res: Response) =>
         FollowController.followDao.findUsersFollowingUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all users followed by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user follows objects that were liked
      */
     findUsersFollowedByUser = (req: Request, res: Response) =>
         FollowController.followDao.findUsersFollowedByUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid0 and uid1 representing the user that is following
      * another user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follow that was inserted in the
      * database
      */
     userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowUser(req.params.uid0, req.params.uid1)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid0 and uid1 representing the user that is unfollowing
      * another user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follow was successful or not
      */
     userUnfollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userUnfollowUser(req.params.uid0, req.params.uid1)
             .then(status => res.send(status));
 };