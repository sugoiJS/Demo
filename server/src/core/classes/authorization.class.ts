import {AuthProvider} from "@sugoi/server";
import e = require("express");

export class Authorization extends AuthProvider<any> {

    /**
     * Verify if user is authorized
     *
     * Implemented dummy check for x-sug-demo header to be equal to "Wyn1RRR9PQJPaqYM"
     *
     * @returns {Promise<boolean>}
     */
    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(this.headers["x-sug-demo"] === "Wyn1RRR9PQJPaqYM");
    }

    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true);
    }

    getUser(req: e.Request, res: e.Response, next: e.NextFunction): Promise<any> {
        return Promise.resolve(true);
    }

    isInRole(role: string | number): Promise<boolean> {
        return Promise.resolve(true);

    }

    isAllowedTo(...permissions: Array<string | number>): Promise<boolean> {
        return Promise.resolve(false);
    }

}