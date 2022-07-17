import Express from 'Express';
import { config } from 'dotenv';
config({ path: './config/config.env' });
import cookieParser from 'cookie-parser';
// import session from 'express-session';
import cors from 'cors';
// import mongan from 'morgan';
import { createServer } from 'http';
import DBConnect from './config/db';
import routers from './routers';
import globalErrHandler from './middlewires/error';

const app = Express();
const middlewires = [
    Express.json({ limit: process.env.JSON_FILE_LIMIT }),
    cors(),
    Express.urlencoded({ extended: true, limit: process.env.URLENCODED_LIMIT }),
    cookieParser(),
    globalErrHandler
];

app.use(middlewires);
const httpServer = createServer(app);


//Roters
app.use('/api/v1', routers);

app.use('*', (req, res, _n) => {
    res.status(404).json(`${req.path} not found`);
});


if (process.env.NODE_ENV === 'development') app.use(mongan);
//Database Connection
if (process.env.MONGO_URI) DBConnect();
const PORT = process.env.PORT || 1111;
const server = httpServer.listen(PORT, _ => {
    console.log(`Alhamdu lillah server is listening on port ${PORT}`);
});


