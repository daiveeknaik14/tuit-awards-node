import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

/**
 * Represents the model for the MessageModel
 */
const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel;