/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import TuitDaoI from "../daos/TuitDao";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
 export default class TuitDao implements TuitDaoI{
     private static tuitDao: TuitDao | null = null;
 
     /**
      * Creates singleton DAO instance
      * @returns tuitDao
      */
     public static getInstance = (): TuitDao => {
         if(TuitDao.tuitDao === null) {
             TuitDao.tuitDao = new TuitDao();
         }
         return TuitDao.tuitDao;
     }
     private constructor() {}
     findAllTuits = async (): Promise<Tuit[]> =>
         TuitModel.find()
             .populate("postedBy")
             .exec();
 
     /**
      * Uses TuitModel to retrieve all user documents from tuits collection from the database
      * @param {string} uid User's primary key
      * @returns Promise To be notified when user is retrieved
      */
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid})
             .sort({'postedOn': -1})
             .populate("postedBy")
             .exec();
     /**
      * Uses TuitModel to retrieve single tuit document from tuits collection from the database
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when tuit is retrieved
      */
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();
     /**
      * Inserts tuit instance into the database
      * @param {Tuit} tuit Instance to be inserted into the database
      * @returns Promise To be notified when tuit is inserted into the database
      */
     createTuit = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});
 
     /**
      * Updates tuit with new values in database
      * @param {string} tid Tuit's primary key
      * @param {Tuit} tuit Tuit object containing properties and their new values
      * @returns Promise To be notified when tuit is updated in the database
      */
     updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: tid},
             {$set: tuit});
     updateLikes = async (tid: string, newStats: any): Promise<any> =>
         TuitModel.updateOne(
             {_id: tid},
             {$set: {stats: newStats}}
         );
 
     /**
      * Uses TuitModel to retrieve all user documents from tuits collection from the database
      * @param {string} uid User's primary key
      * @returns Promise To be notified when user is retrieved
      */
     async findTuitsByUser(uid: string): Promise<any> {
         return await TuitModel.find({postedBy: uid});
     }
 
     /**
      * Removes tuit from the database.
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when tuit is removed from the database
      */
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }