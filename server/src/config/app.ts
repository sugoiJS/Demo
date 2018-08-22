import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as path from "path";
import {HttpServer} from "@sugoi/server";

import {paths} from './paths';
import {MongoModel} from "@sugoi/mongodb";
import {services} from "./services";
import {BootstrapModule} from "../modules/bootstrap.module";
import {errorHandler} from "../core/middleware/error.middleware";

const DEVELOPMENT = process.env.ENV.indexOf('dev') !== -1;
const TESTING = process.env.ENV.indexOf('test') !== -1;
/**
 * Set DBs for being singleton
 */
const setDBs = function (app) {
    // todo: comment out to establish connection to mongoDB
    // MongoModel.setConnection(services.MONGODB).catch(console.error);
};


const server:HttpServer = HttpServer.init(BootstrapModule,"/api")
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
        app.use((req, res, next) =>{
            //  set fallback send the web app index file
            return res.sendFile(path.resolve(paths.index))
        });
        // the value which will return to the client in case of exception
        app.use(errorHandler(DEVELOPMENT || TESTING));
    });


export {server};
