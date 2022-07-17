import Express from 'Express';
import { config } from 'dotenv';
config({ path: './config/config.env' });
import coockieParser from 'coockie-parser';
// import session from 'express-session';
import cors from 'cors';
import { createServer } from 'http';
import DBConnect from './config/db';
import routers from './routers';

const app = Express();
const middlewires = [
    Express.json({ limit: process.env.JSON_FILE_LIMIT }),
    cors(),
    Express.urlencoded({ extended: true, limit: process.env.URLENCODED_LIMIT }),
    coockieParser(),
];

app.use(middlewires);
const httpServer = createServer(app);


//Roters
app.use('/api/v1', routers);

app.use('*', (req, res, _n) => {
    res.status(404).json(`${req.path} not found`);
});

app.use((err, _rq, res, _n) => {
    console.log('err Name', err.message);
    const message = err.message || `ServeR ErroR OccereD`;
    let status = err.status || 500;
    if (err.name === "MongoServerError") status = 500;

    return res.status(status).json({
        message
    });
});
DBConnect();
const PORT = process.env.PORT || 1111;
const server = httpServer.listen(PORT, _ => {
    console.log(`Alhamdu lillah server is listening on port ${PORT}`);
});


