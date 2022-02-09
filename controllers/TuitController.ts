import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import TuitControllerInterface from "../interfaces/TuitController";

export default class TuitController implements TuitControllerInterface {
    app: Express;
    tuitDao: TuitDao;

    constructor(app: Express) { 

        this.app = app;
        this.tuitDao = new TuitDao();

        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.get('/users/:uid/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
    }

    findAllTuits = (req: Request, res: Response) => {
        this.tuitDao.findAllTuits().then(tuit => res.json(tuit));
    }

    findTuitById = (req: Request, res: Response) => {
        this.tuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));
    }

    findTuitsByUser = (req: Request, res: Response) =>{
        this.tuitDao.findTuitsByUser(req.params.uid).then(tuit => res.json(tuit));
    }

    createTuit = (req: Request, res: Response) => {
        this.tuitDao.createTuit(req.body).then(tuit => res.json(tuit));
    }

    deleteTuit = (req: Request, res: Response) => {
        this.tuitDao.deleteTuit(req.params.tid).then(status => res.json(status));
    }

    updateTuit = (req: Request, res: Response) => {
        this.tuitDao.updateTuit(req.params.tid, req.body).then(status => res.json(status));
    }
}