/**
 * @file Declares Message relationship between two users
 */
 import User from "./users/User";

 /**
  * @typedef Message Representing message relation between two users.
  * @property {string} message represents the content of the message
  * @property {User} to the reciever of the message
  * @property {User} from the sender of the message
  * @property {Date} sentOn the date of the message
  */
 export default interface Message {
     message: string,
     to: User,
     from: User,
     sentOn: Date,
 };