import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";
/**
 * Represents the schema for the BookmarkSchema
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;