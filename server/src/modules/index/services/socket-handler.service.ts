import {Injectable} from "@sugoi/core";
import {SocketOn, SocketHandler} from "@sugoi/socket";
import {GENERIC_SOCKET_EVENTS} from "../../../../../common/constants/generic-socket-events.constant";

@Injectable()
export class SocketHandlerService {

    public amount = 1;

    constructor() {

    }

    @SocketOn(GENERIC_SOCKET_EVENTS.REGISTER_USER, "/",
        (socket) => {
            console.log("new client registered %s", socket.id);
        })
    registerForClientUsage(socket, intervalInSec) {
        let time = 0;
        setInterval(() => SocketHandlerService.updateClientUsage(socket, time += intervalInSec), intervalInSec * 1000);
        SocketHandlerService.updateClientUsage(socket, time);
    }

    private static updateClientUsage(socket, usage) {
        socket.emit(GENERIC_SOCKET_EVENTS.USAGE_TIME, usage)
    }

    public emitToAllSockets(event: string, data) {
        SocketHandler.getHandler().getNamespace("/").emit(event, data)
    }

}