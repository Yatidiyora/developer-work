import errorHandler from 'errorhandler';
import dotenv from 'dotenv';
import { getCustomLogger } from './common/utils/Logger';
import app from './app';

dotenv.config();
const logger = getCustomLogger('server');

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  logger.info('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  logger.info('  Press CTRL-C to stop\n');
});

export default server;
