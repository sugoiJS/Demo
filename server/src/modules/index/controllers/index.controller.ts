import {
    RequestSchemaPolicy, RequestBody, Controller, HttpGet, RequestParam, HttpPost, HttpPut,
    HttpDelete
} from "@sugoi/server";
import {UsePolicy, Policy, ValidateSchemaPolicy, SchemaTypes, ComparableSchema} from "@sugoi/core";
import {DummyDataModel} from "../models/dummy-data.model";
import {SocketHandlerService} from "../services/socket-handler.service";
import {GENERIC_SOCKET_EVENTS} from "../../../../../common/constants/generic-socket-events.constant";
import {MongoModel} from "@sugoi/mongodb";
import {QueryOptions} from "@sugoi/orm";
import {SortOptions} from "@sugoi/orm/dist/constants/sort-options.enum";
import {SortItem} from "@sugoi/orm/dist/classes/sort-item.class";

@Controller('/index')
export class IndexController {
    private static readonly COLORS = ["bisque", "darkcyan", "aliceblue", "yellowgreen"];

    constructor(private socketHandler: SocketHandlerService) {
    }


    /**
     * This endpoint require id which contain at least on letter (using @RequestSchemaPolicy policy).
     * The endpoint will try to query the DummyDataModel using this id.
     * If resource not found it will get created after it will get valid (amount should be lower than 10)
     *
     * @param {string} id
     * @returns {Promise<any>}
     */
    @HttpGet("/data/:id?")
    @RequestSchemaPolicy({"id": ComparableSchema.ofType(SchemaTypes.STRING).setRegex("([a-z])+")})
    async getData(@RequestParam('id') id: string) {
        try {
            return await id ? DummyDataModel.findById(id)
                : DummyDataModel.findAll({}, QueryOptions.builder()
                    .setSortOption(
                        new SortItem(SortOptions.DESC, "amount"),
                        new SortItem(SortOptions.ASC, "lastUpdate")
                    )
                );
        } catch (error) {
            console.log(error);
            const myData = new DummyDataModel(null);
            //5001 means you didn't setup a connection to mongoDB server
            if (error.code == 5001) {
                myData['_id'] = MongoModel.getIdObject("1e23-1e23-1e2f-eeff");
                return myData;
            }
        }
    }

    /**
     * This endpoint requires body with 'amount' property which is type number and minimum of 2 (using @RequestSchemaPolicy policy).
     * The endpoint will try to create the DummyDataModel using this data, otherwise the error will returned to the client.
     * @param {DummyDataModel} body - example: {"amount": 2}
     * @returns {Promise<any>}
     */
    @HttpPost("/data")
    @RequestSchemaPolicy(null, null, {"amount": ComparableSchema.ofType(SchemaTypes.NUMBER).setMandatory(true).setMin(2)})
    async createData(@RequestBody() body:DummyDataModel) {
        const myData = new DummyDataModel(body.amount);
        return await myData.save()
            .catch(err => {
                console.error(err);
                return err;
            });
    }

    /**
     * This endpoint update the value of existing record.
     *
     * @param {string} id
     * @param {DummyDataModel} body - example: {"amount":2}
     * @returns {Promise<any>}
     */
    @HttpPut("/data/:id")
    @RequestSchemaPolicy(null, null, {"amount": ComparableSchema.ofType(SchemaTypes.NUMBER).setMin(2)})
    async updateData(@RequestParam("id") id: string, @RequestBody() body: DummyDataModel) {
        return await DummyDataModel.updateById(id, body)
            .catch(err => {
                console.error(err);
                return err;
            });
    }

    /**
     * This value remove existing record by id
     * @param {string} id
     * @param {DummyDataModel} body
     * @returns {Promise<any>}
     */
    @HttpDelete("/data/:id")
    async deleteData(@RequestParam("id") id: string, @RequestBody() body: DummyDataModel) {
        return await DummyDataModel.removeById(id);
    }

    @HttpGet("/changeColor")
    changeColor() {
        const index = Math.floor(Math.random() * Math.floor(IndexController.COLORS.length));
        this.socketHandler.emitToAllSockets(GENERIC_SOCKET_EVENTS.COLOR_CHANGE, IndexController.COLORS[index]);
        return {color: IndexController.COLORS[index]};
    }

}