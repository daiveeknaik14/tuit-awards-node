import Follow from "../models/Follow";

export default interface FollowDaoI {
    findUsersFollowingUser (uid: string): Promise<Follow[]>;
    findUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userUnfollowsUser (uidFollowing: string, uidFollower: string): Promise<any>;
    userFollowsUser (uidFollowing: string, uidFollower: string): Promise<Follow>;
};