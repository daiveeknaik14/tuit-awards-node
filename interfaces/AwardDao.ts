import Award from "../models/award/Award";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface AwardDaoI {
    findAward (aid:string): Promise<Award[]>;
};