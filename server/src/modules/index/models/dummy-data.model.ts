import {MongoResource} from "../../../core/models/mongo-resource.model";
import {IBeforeValidate, IValidate, IBeforeSave, IBeforeUpdate, ConnectionName} from "@sugoi/mongodb";

@ConnectionName("SugoiApplicationDB")
export class DummyDataModel extends MongoResource implements IValidate, IBeforeSave, IBeforeUpdate, IBeforeValidate {
    public static maxAmount: number = 10;
    public maxAmount: number;

    amount: number | string;

    lastUpdate: string;

    constructor(amount: number | string) {
        super();
        this.amount = amount;
    }

    beforeValidate(): void | Promise<any> {
        this.maxAmount = this.maxAmount || DummyDataModel.maxAmount;
        this.amount = this.amount == null ? 0 : parseInt(<string>this.amount);
    }

    validate(): Promise<boolean | string> {
        return Promise.resolve(this.amount < this.maxAmount);
    }

    beforeSave(): void | Promise<any> {
        this.setLastUpdated();
    }

    beforeUpdate(): void | Promise<any> {
        this.setLastUpdated();
    }

    private setLastUpdated() {
        this.lastUpdate = (new Date()).toISOString();
    }


}