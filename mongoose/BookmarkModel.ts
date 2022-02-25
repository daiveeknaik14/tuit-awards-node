import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";
/**
 * Represents the bookmark model.
 */
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;