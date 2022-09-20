import mg from 'mongoose';
import logger from './logger';
import config from 'config';
function connect() {
  const uri = config.get<string>('dbUri');
  return mg
    .connect(uri)
    .then(() => {
      logger.info(`connected to db`);
    })
    .catch((e) => {
      logger.error(e.message);
      process.exit(1);
    });
}
export default connect;
