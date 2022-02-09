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

    async findTuitsByUser(uid: string): Promise<any> {
        return await TuitModel.find({postedBy: uid});
    }

    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
}