/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import DislikeDao from "../daos/DislikeDao";
 import DislikeControllerI from "../interfaces/DislikeControllerI";
 import TuitDao from "../daos/TuitDao";
 
 /**
  * @class TuitController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
  *     no londer likes a tuit</li>
  * </ul>
  * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
  * @property {LikeController} LikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class DislikeController implements DislikeControllerI {
     private static dislikeDao: DislikeDao = DislikeDao.getInstance();
     private static tuitDao: TuitDao = TuitDao.getInstance();
     private static dislikeController: DislikeController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): DislikeController => {
         if(DislikeController.dislikeController === null) {
             DislikeController.dislikeController = new DislikeController();
             app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
             app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
             app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
         }
         return DislikeController.dislikeController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that liked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
             .then(dislikes => res.json(dislikes));
 
     /**
      * Retrieves all tuits liked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
     findAllTuitsDislikedByUser = (req: Request, res: Response) => {
         const uid = req.params.uid;
         // @ts-ignore
         const profile = req.session['profile'];
         const userId = uid === "my" && profile ?
             profile._id : uid;
         DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
             .then(dislikes => {
                 const likesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                 const tuitsFromLikes = likesNonNullTuits.map(dislike => dislike.tuit);
                 res.json(tuitsFromLikes);
             });
     }
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being liked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
     userTogglesTuitDislikes = async (req: Request, res: Response) => {
         const dislikeDao = DislikeController.dislikeDao;
         const tuitDao = DislikeController.tuitDao;
         const uid = req.params.uid;
         const tid = req.params.tid;
         // @ts-ignore
         const profile = req.session['profile'];
         const userId = uid === "my" && profile ?
             profile._id : uid;
 
         try {
             const userAlreadyLikedTuit = await dislikeDao.findUserDislikesTuit(userId, tid);
             const howManyLikedTuit = await dislikeDao.countHowManyDislikedTuit(tid);
             let tuit = await tuitDao.findTuitById(tid);
             if (!userAlreadyLikedTuit) {
                 // await likeDao.userDislikesTuit(userId, tid);
                 // tuit.stats.likes = howManyLikedTuit - 1;
                 await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                 tuit.stats.dislikes = howManyLikedTuit + 1;
                 await tuitDao.updateLikes(tid, tuit.stats);
                 res.sendStatus(200);
             }
             // else {
             //     await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
             //     await tuitDao.updateLikes(tid, tuit.stats);
             // };
 
         } catch (e) {
             res.sendStatus(404);
         }
     }
 };