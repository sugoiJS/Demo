import {ModelAbstract, Primary, getPrimaryKey} from "@sugoi/orm";
import {HttpService} from "../services/http.service";

export class MicroserviceResource extends ModelAbstract {
    protected static readonly BASE_URL = "https://jsonplaceholder.typicode.com/";

    protected static getUrl() {
        const resource = this.getModelName();
        return `${MicroserviceResource.BASE_URL}${resource}`;
    }

    @Primary()
    public id: string | number;

    constructor() {
        super();
    }

    protected updateEmitter<T = any>(options?: any,query?:any): Promise<T> {
        const url = (<any>this.constructor).getUrl();
        return HttpService.put(`${url}/${this[getPrimaryKey(this)]}`, null, this);
    }

    protected saveEmitter(options?: any): Promise<any> {
        return HttpService.post((<any>this.constructor).getUrl(), null, this);
    }

    protected static removeEmitter(query?: any) {
        const that = this;
        const id = this.getIdFromQuery(query);
        let url = (<any>that).getUrl();
        if (id !== null) {
            url = `${url}/${id}`;
        }
        return HttpService.remove(url, query);
    }

    protected static findEmitter(query?: any) {
        const id = this.getIdFromQuery(query);
        let url = this.getUrl();
        if (id !== null) {
            url = `${url}/${id}`;
        }
        return HttpService.get(url, query);
    }
}