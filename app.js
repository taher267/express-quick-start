import Express from 'Express';
import { config } from 'dotenv';
config({ path: './config/config.env' });
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import { createServer } from 'http';
import DBConnect from './config/db';
import routers from './routers';
import globalErrHandler from './middlewires/error';
import passportConfig from './utils/passport';


const app = Express();
const middlewires = [
    Express.json({ limit: process.env.JSON_FILE_LIMIT }),
    cors(),
    Express.urlencoded({ extended: false, limit: process.env.URLENCODED_LIMIT }),
    cookieParser(),
    globalErrHandler,
];

app.use(middlewires);
app.use(session({
    secret: 'storycat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
}));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
passportConfig(passport)
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
const httpServer = createServer(app);


//Roters
app.use('/', routers);

app.use('*', (req, res, _n) => {
    res.status(404).json(`${req.path} not found`);
});



//Database Connection
if (process.env.MONGO_URI) DBConnect();
const PORT = 5051;
const server = httpServer.listen(PORT, _ => {
    console.log(`Alhamdu lillah server is listening on port ${PORT}`);
});

