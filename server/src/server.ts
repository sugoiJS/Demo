import * as logger from 'winston';
import {socketService} from "@sugoi/socket";
import {server} from "./config/app";


const PORT = parseInt(process.env.PORT) || 3000;
const HOST = server.rootPath;

const serverInstance = server
    .build()
    .listen(PORT, (error: Error) => {
        if (error) {
            logger.error(error.message);
            throw error;
        }
        logger.debug(`Server running @ ${HOST}:${PORT}`);
    });

socketService.init(serverInstance);
