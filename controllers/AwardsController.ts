/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import AwardDao from "../daos/AwardDao";
import AwardControllerI from "../interfaces/AwardControllerI";
import AwardsDao from "../daos/AwardsDao";
import TuitController from "./TuitController";
import TuitDao from "../daos/TuitDao";
import LikeController from "./LikeController";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class AwardsController implements AwardControllerI {
    private static awardDao: AwardDao = AwardDao.getInstance();
    private static awardsDao: AwardsDao = AwardsDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static awardsController: AwardsController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): AwardsController => {
        if(AwardsController.awardsController === null) {
            AwardsController.awardsController = new AwardsController();
            app.post("/api/users/:uid/tuits/:tid/:name", AwardsController.awardsController.awardTuitByUser);
            app.post("/api/users/:name/:coins", AwardsController.awardsController.createAward);
            app.post("/api/tuits/:tid/mockaward", AwardsController.awardsController.increaseAwardsMock);
            app.get("/api/awards/:tid", AwardsController.awardsController.getAwardsGivenToTuit);
            app.get("/api/awardNames/:tid", AwardsController.awardsController.getAwardNameGivenToTuit);
            app.get("/api/awards",AwardsController.awardsController.findAllAwards);
        }
        return AwardsController.awardsController;
    }

    private constructor() {}

    getAwardNameGivenToTuit = async (req: Request, res: Response) => {
        const tid = req.params.tid;
        try {
            const awardsGivenToTuit = await AwardsController.awardsDao.getAwardsGivenToTuit(req.params.tid);
        } catch (e) {
            res.sendStatus(403);
        }
    }


    getAwardsGivenToTuit = (req: Request, res: Response) =>
        AwardsController.awardsDao.getAwardsGivenToTuit(req.params.tid)
            .then(awards => res.json(awards));

    findAllAwards = (req: Request, res: Response) =>
        AwardsController.awardDao.findAllAwards()
            .then(awards => res.json(awards));

    createAward = async (req: Request, res: Response) => {
        const name = req.params.name;
        const coins = req.params.coins;
        await AwardsController.awardDao.createAward(name, coins);
        res.sendStatus(200);
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    awardTuitByUser = async (req: Request, res: Response) => {
        const awardDao = AwardsController.awardDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        const awardname = req.params.name;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "my" && profile ?
            profile._id : uid;
        try {
            const award = await awardDao.findAward(awardname);
            console.log(award[0]);
            const awardid = award[0]._id;
            const coins = award[0].coins;
            console.log(awardid);
            console.log(coins);
            await AwardsController.awardsDao.awardTuitByUser(awardid, userId, tid);
            let tuit = await AwardsController.tuitDao.findTuitById(tid);
            // Tuit has an attribute awards. When this api hits, number of awards in tuits is incremented by 1.
            tuit.stats.awards += 1;
            await AwardsController.tuitDao.updateLikes(tid,tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    increaseAwardsMock = async (req: Request, res: Response) => {
        const tuitDao = AwardsController.tuitDao;
        const tid = req.params.tid;
        try {
            let tuit = await tuitDao.findTuitById(tid);
            const numberOfAwards = tuit.awards;
            tuit.stats.awards += 1;
            await tuitDao.updateLikes(tid,tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }

    }

};