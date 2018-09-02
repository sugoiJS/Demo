import {ServerModule} from "@sugoi/server"
import {IndexController} from "./controllers/index.controller";
import {SocketHandlerService} from "./services/socket-handler.service";

@ServerModule({
    controllers:[IndexController],
    services: [
        SocketHandlerService,
    ]
})
export class IndexModule {}