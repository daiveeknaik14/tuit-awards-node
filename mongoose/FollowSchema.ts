import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * Represents the schema for the FollowModel
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection: "follow"});

export default FollowSchema;