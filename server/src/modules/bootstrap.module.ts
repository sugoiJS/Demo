import {ServerModule} from "@sugoi/server"
import {IndexModule} from "./index/index.module";
import {PostsModule} from "./posts/posts.module";

@ServerModule({
    controllers:[],
    services: [],
    modules:[
        IndexModule,
        PostsModule
    ]
})
export class BootstrapModule{}