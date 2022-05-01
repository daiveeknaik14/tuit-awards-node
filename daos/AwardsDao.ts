import AwardsDaoI from "../interfaces/AwardsDao";
import AwardsModel from "../mongoose/awards/AwardsModel";
import Awards from "../models/awards/Awards";

export default class AwardsDao implements AwardsDaoI {
    private static awardsDao: AwardsDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns likeDao
     */
    public static getInstance = (): AwardsDao => {
        if(AwardsDao.awardsDao === null) {
            AwardsDao.awardsDao = new AwardsDao();
        }
        return AwardsDao.awardsDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve all user documents that liked a specific tuit from likes collection from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved
     */
    awardTuitByUser = async (aid: string, uid: string, tid: string): Promise<any> =>
        AwardsModel.create({givenBy: uid, givenTo: tid, awards: aid});


    getAwardsGivenToTuit = async(tid: string): Promise<any> =>
        AwardsModel.find({givenTo: tid}).populate("awards").exec();
}