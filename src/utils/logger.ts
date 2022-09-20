import logger from 'pino';
import dayjs from 'dayjs';

// const log = logger({
//   prettyPrint: true,
//   base: { pid: false },
//   timestamp: () => `,"time":"${dayjs().format()}"`,
// });
const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
export default log;
