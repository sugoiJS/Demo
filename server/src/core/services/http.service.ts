import * as rp from "request-promise";
import {Injectable} from "@sugoi/core";

enum HTTP_METHODS {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE"
}

@Injectable()
export class HttpService {

    public static get(url: string, params = null, headers?) {
        return this.request(HTTP_METHODS.GET, url, params, null, headers);
    }

    public static post(url: string, params = null, body, headers?) {
        return this.request(HTTP_METHODS.POST, url, params, body, headers);
    }

    public static put(url: string, params = null, body, headers?) {
        return this.request(HTTP_METHODS.PUT, url, params, body, headers);
    }

    public static remove(url: string, params = null, headers?) {
        return this.request(HTTP_METHODS.DELETE, url, params,null, headers);
    }

    public static request(method: HTTP_METHODS, url: string, params?, body?, headers?) {
        return rp({
            method: method,
            uri: url,
            qs: params,
            body: typeof body === "string" ? body : JSON.stringify(body),
            headers: headers,
        }).then((res)=>{
            console.log(res);
            return JSON.parse(res);
        })
            .catch((err)=>{
                console.error(err);
                return {};
            })
    }
}