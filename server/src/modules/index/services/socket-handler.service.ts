import {Injectable} from "@sugoi/core";
import {SocketOn, socketService} from "@sugoi/socket";
import {GENERIC_SOCKET_EVENTS} from "../../../../../common/constants/generic-socket-events.constant";
import SocketIOStatic = require("socket.io");

@Injectable()
export class SocketHandlerService {

    constructor(){

    }

    @SocketOn(GENERIC_SOCKET_EVENTS.REGISTER_USER)
    registerForClientUsage(intervalInSec, socket) {
        let time = 0;
        setInterval(() => SocketHandlerService.updateClientUsage(socket, time += intervalInSec), intervalInSec * 1000);
        SocketHandlerService.updateClientUsage(socket, time);
    }

    private static updateClientUsage(socket, usage) {
        socket.emit(GENERIC_SOCKET_EVENTS.USAGE_TIME, usage)
    }

    public emitToAllSockets(event:string,data){
        (<SocketIOStatic.Server>socketService.getSocketServerByNamespace("/")).emit(event,data)
    }

}