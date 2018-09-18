import {ServerModule} from "@sugoi/server";
import {PostController} from "./controllers/post.controller";

@ServerModule({
    controllers:[PostController]
})
export class PostsModule{}