import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import {SugoiError} from "@sugoi/core";
import {ErrorMessage} from "../classes/error-message";


export const errorHandler = (development: boolean = true): ErrorRequestHandler => {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (!development) {
            delete err.stack;
        }

        if (err instanceof ErrorMessage) {
            res.status(400).json(err);
        }
        else{
            sendRes(res,cloneError(err))
        }
        return next();
    }
};
function cloneError(error:any):ErrorMessage{
    let code = error.status || error.code || 500;
    if(code > 599 || code < 100) code = 500;
    const data = "getData" in error && error.getData() ? error.getData() : [];
    const err = new ErrorMessage(code,error.message,new Date(),data);
    err.stack = error.stack;
    return err;
}

function sendRes(res:Response,err:ErrorMessage){
    res.status(err.code).send(err);
}