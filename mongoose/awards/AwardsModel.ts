/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
import mongoose from "mongoose";
import AwardsSchema from "./AwardsSchema";
const AwardsModel = mongoose.model("AwardsModel", AwardsSchema);
export default AwardsModel;