const express = require('express');
require('dotenv').config({ path: './config/config.env' });
const cookieParser = require('cookie-parser');
const axios = require('axios');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const { createServer } = require('http');
const DBConnect = require('./config/db');
const routers = require('./routers');
const globalErrHandler = require('./middlewires/error');
const app = express();

const middlewires = [
  express.json({ limit: process.env.JSON_FILE_LIMIT }),
  cors(),
  express.urlencoded({ extended: false, limit: process.env.URLENCODED_LIMIT }),
  cookieParser(),
];

app.use(middlewires);
app.use(
  session({
    secret: 'storycat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
  })
);

if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'));
const httpServer = createServer(app);

//Roters
app.use('/', routers);

app.use('*', (req, res, _n) => {
  res.status(404).json(`${req.path} not found`);
});

app.use(globalErrHandler);

//Database Connection
if (process.env.MONGO_URI) DBConnect();
const PORT = 5051;
const server = httpServer.listen(PORT, (_) => {
  console.log(`Alhamdu lillah server is listening on port ${PORT}`);
});
