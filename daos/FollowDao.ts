/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
 import FollowDaoI from "../interfaces/FollowDaoI";
 import FollowModel from "../mongoose/FollowModel";
 import Follow from "../models/Follow";
 import User from "../models/users/User";
 
 /**
  * @class FollowDao Implements Data Access Object managing data storage
  * of Follows
  * @property {FollowDao} followDao Private single instance of FollowDao
  */
 export default class FollowDao implements FollowDaoI {
 
     private static followDao: FollowDao | null = null;
 
     /**
      * Creates singleton DAO instance
      * @returns FollowDao
      */
     public static getInstance = (): FollowDao => {
         if(FollowDao.followDao === null) {
             FollowDao.followDao = new FollowDao();
         }
         return FollowDao.followDao;
     }
     private constructor() {}
 
     /**
      * Uses FollowModel to retrieve all users following the user from collection
      * @param {string} uid User's primary key
      * @returns Promise to be notified when users are retrieved from the database
      */
     findUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
         FollowModel
             .find({userFollowing: uid})
             .populate("userFollowed")
             .exec();
 
     /**
      * Uses FollowModel to retrieve all users followed by the user from collection
      * @param {string} uid User's primary key
      * @returns Promise to be notified when users are retrieved from the database
      */
     findUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
         FollowModel
             .find({userFollowed: uid})
             .populate("userFollowing")
             .exec();
 
     /**
      * Inserts user instances into the database
      * @param {string} uidFollowing Following User's primary key
      * @param {string} uidFollowed Followed User's primary key
      * @returns Promise to be notified when users are inserted into the database
      */
     userFollowUser = async (uidFollowing: string, uidFollowed: string): Promise<any> =>
         FollowModel.create({userFollowing: uidFollowing, userFollowed: uidFollowed});
 
     /**
      * Removes user from the database for the user 
      * @param {string} uidFollowing Following User's primary key
      * @param uidFollowed Followed User's primary key
      * @returns Promise to be notified when users are removed from the database 
      */
     userUnfollowUser = async (uidFollowing: string, uidFollowed: string): Promise<any> =>
         FollowModel.deleteOne({userFollowing: uidFollowing, userFollowed: uidFollowed});
 }