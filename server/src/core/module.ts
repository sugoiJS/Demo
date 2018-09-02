import {ServerModule} from "@sugoi/server";
import {HttpService} from "./services/http.service";

@ServerModule({
    controllers:[],
    services: [ HttpService]
})
export class CoreModule {}