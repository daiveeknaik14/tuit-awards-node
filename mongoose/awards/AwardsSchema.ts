import mongoose, {Schema} from "mongoose";
import Awards from "../../models/awards/Awards";

const AwardsSchema = new mongoose.Schema<Awards>({
    givenTo: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    givenBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    awards: {type: Schema.Types.ObjectId, ref: "AwardModel"}
}, {collection: "awards"});

export default AwardsSchema;