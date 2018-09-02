import {Controller, HttpDelete, HttpGet, HttpPost, HttpPut, RequestBody, RequestParam} from "@sugoi/server";
import {Post} from "../models/post.model";

@Controller("/post")
export class PostController {

    @HttpGet("/:id?")
    async getPosts(@RequestParam("id") id: string | number) {
        return await id
            ? Post.findById(id)
            : Post.findAll();
    }

    @HttpPost("/")
    async setPost(@RequestBody() body) {
        const post = Post.clone<Post>(Post, body);
        return await post.save();

    }


    @HttpPut("/:id")
    async updatePost(@RequestParam("id")id: string, @RequestBody() body) {
        const post = await Post.findById(id);
        Object.assign(post,body);
        return await post.update();

    }

    @HttpDelete("/:id")
    async removePost(@RequestParam("id") id:string){
        return await Post.removeById(id);
    }
}