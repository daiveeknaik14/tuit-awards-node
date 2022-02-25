/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
 import MessageDaoI from "../interfaces/MessageDaoI";
 import MessageModel from "../mongoose/MessageModel";
 import Message from "../models/Message";
 
 /**
  * @class MessageDao Implements Data Access Object managing data storage
  * of Messages
  * @property {MessageDao} messageDao Private single instance of MessageDao
  */
 export default class MessageDao implements MessageDaoI {
     private static messageDao: MessageDao | null = null;
 
     public static getInstance = (): MessageDao => {
         if (MessageDao.messageDao === null) {
             MessageDao.messageDao = new MessageDao();
         }
         return MessageDao.messageDao;
     }
 
     private constructor() {}
 
     /**
      * Uses MessageModel to retrieve all messages sent by a user
      * @param uid User's primary key
      * @returns Promise to be notified when messages are retrieved from the database
      */
     findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
             .find({from: uid}).exec();
 
     /**
      * Uses MessageModel to retrieve all messages recieved by the user
      * @param {string} uid User's primary key
      * @returns Promise to be notified when messages are retrieved from the database
      */
     findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
             .find({to: uid})
             .exec();
 
     /**
      * Inserts the message instance into the database
      * @param {string} uidReciever User Reciever's primary key
      * @param {string} uidSender User Sender's primary key
      * @param {string} message content of the message body
      * @returns 
      */
     userMessagesUser = async (uidReceiver: string, uidSender: string, message: Message): Promise<any> =>
         MessageModel.create({...message, to: uidReceiver, from: uidSender, sentOn: Date.now()});
 
     /**
      * Removes message from the database for the user
      * @param uid User's primary key
      * @param mid message's primary key 
      * @returns Promise to be notified when message is removed from the database
      */
     userDeletesMessage = async (uid: string, mid: string): Promise<any> =>
         MessageModel.deleteOne({_id: mid});
 }