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
        } else if (err['status']) {
            res.status(err['status']).json(new ErrorMessage(err['status'], err.message));
        } else {
            const error =new ErrorMessage(500, err.message);
            error.stack = err.stack || error.stack;
            res.status(500).json(error);
        }
        return next();
    }
};