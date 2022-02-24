/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
 import {Express, Request, Response} from "express";
 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkControllerI";
 
 /**
  * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
  * Defines the bookmark HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/bookmarks to retrieve all tuits bookmarked by a particular user.
  *     </li>
  *     <li>POST /api/users/:uid/bookmarks/:tid to bookmark a tuit for a particular user. 
  *     </li>
  *     <li>DELETE /api/users/:uid/bookmarks/:tid to remove a tuit from bookmarks for a particular user.
  *     </li>
  * </ul>
  * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
  * @property {BookmarkController} bookmarkController Singleton controller implementing
  * RESTful Web service API
  */
 export default class BookmarkController implements BookmarkControllerI {
 
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
     private static bookmarkController: BookmarkController | null = null;
     
     /**
      * Creates singleton controller instance
      * @param app Express instance to declare the RESTful Web Service API 
      * @returns BookmarkController
      */
     public static getInstance = (app: Express): BookmarkController => {
         if(BookmarkController.bookmarkController === null) {
             BookmarkController.bookmarkController = new BookmarkController();
             app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
             app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
             app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
         }
         return BookmarkController.bookmarkController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all tuits bookmarked by a particular user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user.
      * @param {Response} res Represents response to client, including the 
      * body formatted as JSON arrays containing the Tuits objects
      */
     findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * @param {Reuqest} req Represents request from client, including
      * path parameters uid and tid representing the user that is bookmarking
      * the particular tuit.
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the tuit that was bookmarked in the
      * database 
      */        
     userBookmarksTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid represnting the user that is unbookmarking
      * the tuit represented by tid
      * @param {Response} res Represents response to client, including status
      * on whether unbookmarking the tuit was successful or not
      * @returns 
      */
     userUnbookmarksTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));
 };