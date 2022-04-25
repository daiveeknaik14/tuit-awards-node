import AwardDaoI from "../interfaces/AwardDao";
import AwardModel from "../mongoose/award/AwardModel";
import Award from "../models/award/Award";
import Awards from "../models/awards/Awards";
import UserModel from "../mongoose/users/UserModel";

export default class AwardDao implements AwardDaoI {
    private static awardDao: AwardDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns likeDao
     */
    public static getInstance = (): AwardDao => {
        if(AwardDao.awardDao === null) {
            AwardDao.awardDao = new AwardDao();
        }
        return AwardDao.awardDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve all user documents that liked a specific tuit from likes collection from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved
     */
    findAward = async (awardname: string): Promise<any> => {
       const res = await AwardModel.find({name: awardname});
       return res;
    }
    findAllAwards = async(): Promise<Award[]> => {
        const res = await AwardModel.find();
        return res;
    }


    createAward = async (name: string, coins: string): Promise<any> => {
        await AwardModel.create({name, coins});
    }
}