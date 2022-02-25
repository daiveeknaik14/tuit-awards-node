import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * Represents the follow model
 */
const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;