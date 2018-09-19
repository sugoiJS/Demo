import {MicroserviceResource} from "../../../core/models/microservice-resource.model";
import {IBeforeSave, IBeforeUpdate, ModelName} from "@sugoi/orm";
import {IPost} from "../interfaces/post.interface";

@ModelName("posts")
export class Post extends MicroserviceResource implements IPost,IBeforeSave,IBeforeUpdate{
    public userId: number;
    public id: number;
    public title: string;
    public body: string;
    public timestamp: number;
    public setTimestamp(timestamp?: number):void {
        if(!timestamp) timestamp = new Date().getTime();
        this.timestamp = timestamp;
    }
    beforeSave(): Promise<any> | void {
        this.setTimestamp()
    }

    beforeUpdate(): Promise<any> | void {
        this.setTimestamp()
    }
    constructor(){
        super()
    }

}

