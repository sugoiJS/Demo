import {SchemaTypes, ComparableSchema} from "@sugoi/core";
import {
    RequestSchemaPolicy, RequestBody, Controller, HttpGet, RequestParam, HttpPost, HttpPut,
    HttpDelete, Authorized, RequestBodySchemaPolicy, RequestParamsSchemaPolicy
} from "@sugoi/server";
import {DummyDataModel} from "../models/dummy-data.model";
import {SocketHandlerService} from "../services/socket-handler.service";
import {GENERIC_SOCKET_EVENTS} from "../../../../../common/constants/generic-socket-events.constant";
import {MongoModel} from "@sugoi/mongodb";
import {QueryOptions} from "@sugoi/orm";
import {SortOptions} from "@sugoi/orm/dist/constants/sort-options.enum";
import {SortItem} from "@sugoi/orm/dist/classes/sort-item.class";
import {DummyDataSchema} from "../schemas/dummy-data.schema";
import {DummyDataIdSchema} from "../schemas/dummy-data-id.schema";

/**
 * This class methods are forbidden for none authorized users.
 *
 * For "authorize" set the x-sug-demo header to be equal to Wyn1RRR9PQJPaqYM
 */
@Controller('/index')
@Authorized()
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
    @RequestParamsSchemaPolicy({"id": DummyDataIdSchema})
    async getData(@RequestParam('id') id: string) {
        try {
            return await id ? DummyDataModel.findById(id)
                : DummyDataModel.findAll({}, QueryOptions.builder()
                    .setSortOptions(
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
    @RequestBodySchemaPolicy(DummyDataSchema)
    async createData(@RequestBody() body: DummyDataModel) {
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
    @RequestBodySchemaPolicy(DummyDataSchema)
    async updateData(@RequestParam("id") id: string, @RequestBody() body: DummyDataModel) {
        return await DummyDataModel.updateById(id, body)
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

    /**
     * Change the color of all connected sockets by using the SocketHandlerService instance
     *
     * @ref server/src/core/classes/authorization.class.ts
     * @returns {{color: string}}
     */
    @HttpGet("/changeColor")
    changeColor() {
        const index = Math.floor(Math.random() * Math.floor(IndexController.COLORS.length));
        this.socketHandler.emitToAllSockets(GENERIC_SOCKET_EVENTS.COLOR_CHANGE, IndexController.COLORS[index]);
        return {color: IndexController.COLORS[index]};

    }
}