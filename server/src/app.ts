import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as fs from 'fs';
import * as path from "path";
import {HttpServer, defaultErrorHandler} from "@sugoi/server";

import {paths} from './config/paths';
import {MongoModel} from "@sugoi/mongodb";
import {services} from "./config/services";
import {BootstrapModule} from "./modules/bootstrap.module";
import {Authorization} from "./core/classes/authorization.class";
import { MongoMemoryServer } from 'mongodb-memory-server';

const DEVELOPMENT = process.env.ENV.indexOf('dev') !== -1;
const TESTING = process.env.ENV.indexOf('test') !== -1;
/**
 * Set DBs for being singleton
 * todo: comment out for establish a connection to mongoDB
 */
const setDBs = async function (app) {
    if(DEVELOPMENT || TESTING){
        // For demo usage only!
        await new MongoMemoryServer({instance: services.MONGODB});
    }
    MongoModel.setConnection(services.MONGODB,"SugoiApplicationDB").catch(console.error);
};


/**
 * todo:comment out in case you want to run the server as https
 */
// const httpsConfig = {
//     key: fs.readFileSync(path.resolve(__dirname,'../server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname,'../server.cert'))
// };
// const server: HttpServer = HttpServer.init(BootstrapModule, "/api", Authorization,httpsConfig)
const server: HttpServer = HttpServer.init(BootstrapModule, "/api", Authorization)
    .setStatic(paths.staticDir) // set static file directory path
    .setMiddlewares((app) => {
        app.disable('x-powered-by');

        app.set('etag', 'strong');
        app.set('host', process.env.HOST || '0.0.0.0');

        app.use(bodyParser.json());
        app.use(compression());

        setDBs(app);

    })
    .setErrorHandlers((app) => {
        app.use((req, res, next) => {
            //  set fallback send the web app index file
            return res.sendFile(path.resolve(paths.index))
        });
        // the value which will return to the client in case of exception
        app.use(defaultErrorHandler(DEVELOPMENT || TESTING));
    });

export {server};
