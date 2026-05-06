import { getLogger, type Logger } from '@webexdx/koa-wrap/logger';
import { LOG_SETTINGS } from '../config/config';

const logger: Logger = getLogger({
  print: {
    level: LOG_SETTINGS.PRINT.LEVEL,
    colorize: LOG_SETTINGS.PRINT.COLORIZE,
  },
  file: {
    level: LOG_SETTINGS.FILE.LEVEL,
    logToFile: LOG_SETTINGS.FILE.LOG_TO_FILE,
  },
});

export default logger;
