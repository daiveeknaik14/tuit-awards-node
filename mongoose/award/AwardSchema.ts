import mongoose, {Schema} from "mongoose";
import Award from "../../models/award/Award";

const AwardSchema = new mongoose.Schema<Award>({
    name: {type: String},
    coins: {type: Number, default: 10}
}, {collection: "award"});

export default AwardSchema;