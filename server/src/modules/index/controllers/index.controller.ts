import {RequestSchemaPolicy, RequestBody, Controller, HttpGet, RequestParam, HttpPost} from "@sugoi/server";
import {UsePolicy, Policy, ValidateSchemaPolicy, SchemaTypes, ComparableSchema} from "@sugoi/core";
import {DummyDataModel} from "../models/dummy-data.model";
import {SocketHandlerService} from "../services/socket-handler.service";
import {GENERIC_SOCKET_EVENTS} from "../../../../../common/constants/generic-socket-events.constant";
import {MongoModel} from "@sugoi/mongodb";

@Controller('/index')
export class IndexController {
    private static readonly COLORS = ["bisque","darkcyan","aliceblue", "yellowgreen"];

    constructor(private socketHandler: SocketHandlerService) {
    }


    /**
     * This endpoint require id which contain at least on capital letter (using @RequestSchemaPolicy policy).
     * The endpoint will try to query the DummyDataModel using this id.
     * If resource not found it will get created after it will get valid (amount should be lower than 10)
     *
     * @param {string} id
     * @param {string} amount
     * @returns {Promise<any>}
     */
    @HttpGet("/:id/:amount")
    @RequestSchemaPolicy({"id": ComparableSchema.ofType(SchemaTypes.STRING).setRegex("([A-Z])+")})
    async getData(@RequestParam('id') id: string, @RequestParam('amount') amount: string) {
        try {
            return await DummyDataModel.find(id)
        } catch (error) {
            console.log(error);
            const myData = new DummyDataModel(amount);
            //5001 means you didn't setup a connection to mongoDB server
            if (error.code == 5001) {
                myData['_id'] = MongoModel.getIdObject("1e23-1e23-1e2f-eeff");
                return myData;
            }
            return await myData.save()
        }
    }

    /**
     * This endpoint requires body with 'amount' property which is type number and minimum of 2 (using @RequestSchemaPolicy policy).
     * The endpoint will try to create the DummyDataModel using this data, otherwise the error will returned to the client.
     * @param body
     * @returns {Promise<any>}
     */
    @HttpPost("/")
    @RequestSchemaPolicy(null, null, {"amount": ComparableSchema.ofType(SchemaTypes.NUMBER).setMandatory(true).setMin(2)})
    async postData(@RequestBody() body) {
        const myData = new DummyDataModel(body.amount);
        return await myData.save()
    }

    @HttpGet("/")
    changeColor() {
        const index = Math.floor(Math.random() * Math.floor(IndexController.COLORS.length));
        this.socketHandler.emitToAllSockets(GENERIC_SOCKET_EVENTS.COLOR_CHANGE,IndexController.COLORS[index])
    }

}