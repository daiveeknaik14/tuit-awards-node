import User from "../users/User";

/**
 * Represents the tuit
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};