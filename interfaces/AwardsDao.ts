import Awards from "../models/awards/Awards";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface AwardsDaoI {
    awardTuitByUser (aid: string, uid: string, tid: string): Promise<Awards[]>;
};