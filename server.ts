
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";

import mongoose from "mongoose";
mongoose.connect('mongodb+srv://daiveeknaik:daiveek@cluster0.cphi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on("error", function(error) {
    console.log(error)
  })
  
  mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.")
  })

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = new UserController(app);
const tuitController = new TuitController(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);