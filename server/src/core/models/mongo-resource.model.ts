import {MongoModel} from "@sugoi/mongodb";
import {IAfterUpdate} from "@sugoi/orm";

export class MongoResource extends MongoModel implements IAfterUpdate{
    afterUpdate(updateResponse?: any): Promise<any> | void {
        updateResponse.success = !!(!!updateResponse && updateResponse.ok);
        return Promise.resolve(updateResponse);
    }
    public get id(){
        return this._id.toString();
    }

}