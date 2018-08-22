import {MongoModel} from "@sugoi/mongodb";

export class MongoResource extends MongoModel{
    public get id(){
        return this._id.toString();
    }

}