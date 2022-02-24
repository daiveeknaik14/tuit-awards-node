import Follow from "../models/Follow";

export default interface FollowDaoI {
    findUsersFollowingUser (uid: string): Promise<Follow[]>;
    findUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userUnfollowUser (uidFollowing: string, uidFollower: string): Promise<any>;
    userFollowUser (uidFollowing: string, uidFollower: string): Promise<Follow>;
};