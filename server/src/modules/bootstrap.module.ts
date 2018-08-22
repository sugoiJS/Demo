import {ServerModule} from "@sugoi/server"
import {IndexModule} from "./index/index.module";

@ServerModule({
    controllers:[],
    services: [],
    modules:[IndexModule]
})
export class BootstrapModule{
    constructor(){}
}