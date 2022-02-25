import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * Represents tuit model
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;