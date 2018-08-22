import {Injectable} from "@sugoi/core";
import {SocketOn} from "@sugoi/socket";
import {GENERIC_SOCKET_EVENTS} from "../../../../../common/constants/generic-socket-events.constant";
import {Socket} from "socket.io";

@Injectable()
export class SocketHandlerService {
    protected sockets: Socket[];

    constructor(){

    }

    @SocketOn(GENERIC_SOCKET_EVENTS.REGISTER_USER)
    registerForClientUsage(intervalInSec, socket) {
        if(!this.sockets) this.sockets = [];
        this.sockets.push(socket);
        let time = 0;
        setInterval(() => SocketHandlerService.updateClientUsage(socket, time += intervalInSec), intervalInSec * 1000);
        SocketHandlerService.updateClientUsage(socket, time);
    }

    private static updateClientUsage(socket, usage) {
        socket.emit(GENERIC_SOCKET_EVENTS.USAGE_TIME, usage)
    }

    public emitToAllSockets(event:string,data){
        this.sockets.forEach(socket=>socket.emit(event,data))
    }

}