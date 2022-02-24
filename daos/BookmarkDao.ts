/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
 import BookmarkDaoI from "../interfaces/BookmarkDaoI";
 import BookmarkModel from "../mongoose/BookmarkModel";
 import Bookmark from "../models/Bookmark";
 
 /**
  * @class BookmarkDao Implements Data Access Object managing data storage
  * of Bookmarks
  * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
  */
 export default class BookmarkDao implements BookmarkDaoI {
 
     private static bookmarkDao: BookmarkDao | null = null;
 
     /**
      * Creates singleton DAO instance
      * @returns BookmarkDao
      */
     public static getInstance = (): BookmarkDao => {
         if(BookmarkDao.bookmarkDao === null) {
             BookmarkDao.bookmarkDao = new BookmarkDao();
         }
         return BookmarkDao.bookmarkDao;
     }
 
     private constructor() {}
 
     /**
      * Uses BookmarkModel to retrieve all tuits bookmarked by the user from bookmarks collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when bookmarks are retrieved from the database
      */
     findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
         BookmarkModel
             .find({bookmarkedBy: uid})
             .populate("bookmarkedTuit")
             .exec();
 
     /**
      * Inserts bookmark instance into the database
      * @param {string} uid User's primary key
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when bookmark is inserted into the database
      */
     userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
         BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
 
     /**
      * Removes bookmark from the database for the user
      * @param {string} uid User's primary key
      * @param tid bookmarked Tuit's primary key
      * @returns Promise to be notified when bookmark is removed from the 
      * databse
      */
     userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
         BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
 }