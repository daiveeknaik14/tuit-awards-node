/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
import mongoose from "mongoose";
import AwardSchema from "./AwardSchema";
const AwardModel = mongoose.model("AwardModel", AwardSchema);
export default AwardModel;