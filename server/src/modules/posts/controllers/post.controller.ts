import {
    Controller, HttpDelete, HttpGet, HttpPost, HttpPut, RequestBody,
    RequestParam,HttpResponseMessage,StringContent
} from "@sugoi/server";
import {Post} from "../models/post.model";

@Controller("/post")
export class PostController {

    @HttpGet("/:id?")
    async get(@RequestParam("id") id: string | number) {
        return await id
            ? Post.findById(id).then(post=>{
                const response = new HttpResponseMessage(202);
                response.content = new StringContent(JSON.stringify(post));
                return response;
            })
            : Post.findAll();
    }

    @HttpPost("/")
    async create(@RequestBody() body) {
        const post = Post.clone<Post>(Post, body);
        return await post.save()

    }


    @HttpPut("/:id")
    async update(@RequestParam("id")id: string, @RequestBody() body) {
        const post = await Post.findById(id);
        Object.assign(post,body);
        return await post.update();

    }

    @HttpDelete("/:id")
    async remove(@RequestParam("id") id:string){
        return await Post.removeById(id);
    }
}