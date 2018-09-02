import {ServerModule} from "@sugoi/server";
import {PostController} from "./controllers/post.controller";

@ServerModule({
    controllers:[PostController],
    services:[]
})
export class PostsModule{}