import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import path from "path/posix";


export default class TuitDao implements TuitDaoI{
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    async createTuit(tuit: Tuit): Promise<any>{
        return await TuitModel.create(tuit);
    }

    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid);

   updateTuit = async (tid: string): Promise<any> =>
       TuitModel.findById(tid)
           .updateOne()

   deleteTuit = async (tid: string): Promise<any> =>
       TuitModel.findById(tid)
           .deleteOne()


}