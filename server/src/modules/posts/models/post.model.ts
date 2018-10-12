import {MicroserviceResource} from "../../../core/models/microservice-resource.model";
import {IBeforeSave, IBeforeUpdate, Ignore, ModelName, Required} from "@sugoi/orm";
import {IPost} from "../interfaces/post.interface";

@ModelName("posts")
export class Post extends MicroserviceResource implements IPost, IBeforeSave, IBeforeUpdate {
    public userId: number;
    public id: number;

    /**
     * this field must be defined and shouldn't be empty string
     */
    @Required()
    public title: string;

    /**
     * this field must be defined
     */
    @Required(true)
    public body: string;

    /**
     * this field won't send to store and as response
     */
    @Ignore()
    public timestampSet: boolean;

    public timestamp: number;

    public setTimestamp(timestamp?: number): void {
        if (!timestamp) timestamp = new Date().getTime();
        this.timestamp = timestamp;
        this.timestampSet = true;
    }

    beforeSave(): Promise<any> | void {
        this.setTimestamp()
    }

    beforeUpdate(): Promise<any> | void {
        this.setTimestamp()
    }

    constructor() {
        super()
    }

}

