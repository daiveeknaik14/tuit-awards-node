import User from "./users/User"

/**
 * Represents the follow
 */
export default interface Follow{
    userFollowed: User,
    userFollowing: User,
};