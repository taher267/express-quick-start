import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
const app = express();
const PORT = config.get<number>('port');
connect()
  .then(() => {
    app.listen(PORT, () =>
      logger.info(`Alhamdu lillah, server is listering on port: ${PORT}`)
    );
    routes(app);
  })
  .catch((e) => console.log(e));
