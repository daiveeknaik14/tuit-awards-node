/**
 * @file Declares Bookmark data type represnting Bookmark relatinoship between a user and a tuit
 */
 import Tuit from "./tuits/Tuit";
 import User from "./users/User";
 
 /**
  * @typedef Bookmark Represents bookmarks relationship between a user
  * and a tuit
  * @property {User} bookmarkedBy User who bookmarked the tuit
  * @property {Tuit} bookmarkedTuit Tuit that is bookmarked 
  */
 export default interface Bookmark {
     bookmarkedBy: User,
     bookmarkedTuit: Tuit
 };