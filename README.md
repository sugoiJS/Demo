# SugoiJS Framework Demo

## Introduction
SugoiJS is a minimal modular framework,

which gives you the ability to use only what you need, fast.

## Getting started

1. `git clone https://github.com/sugoiJS/demo.git`
2. `cd demo/server`
3. `npm install`
4. `npm run build` OR `npm run dev` (live recompile)
5. `node dist/server.js`
6. Go to `http://localhost:3000` in your browser.

## What we got inside?

1. 3 modules -

    CoreModule - This module use for setting core logic of our server

    IndexModule - This module demonstrate usage of socket with SocketHandlerService and handling Mongo resource named DummyDataModel using MongoModel.

    PostsModule - This module demonstrate handling Microservice resource named posts using ModelAbstract (PostModel).

2. 2 controllers
    - /index - 2 paths guarded by policy and 1 unguarded:
    
        > authorized access required - use header x-sug-demo with value set to "Wyn1RRR9PQJPaqYM"

        - `GET /api/index/data/:id` - get DummyData record

            schema - `{id:string//with regex "([a-z])+"}`

        - `POST /api/index/data` - create new DummyData record

            schema - `{amount:number//>=2}`

        - `PUT /api/index/data/:id` - update existing DummyData record

            schema - `{amount:number//>=2}`

        - `DELETE /api/index/data/:id` - remove existing DummyData record


        - `GET /api/index/changeColor` - update background color for all connected clients (using sockets)


    - /post - 4 unguarded paths:

        - `GET /api/post/:id?` - get all of the posts or by id (id is optional param)

        - `POST /api/post` - create new post.

        - `PUT /api/post/:id` - update existing post.

        - `DELETE /api/post/:id` - remove existing post.

3. 1 Service:

    - SocketHandlerService which handle the socket events

4. 1 Authorization class:

    -   Authorization - extends AuthProvider and apply the checks of @Authorized decorator



## File structure

 - client - directory for our client project
 - assets - client project compiled & minified code
 - common - generic files which used for both client & server
 - server - directory for our server project

    -- config - webpack configs

    -- dist - compiled code

    -- src - application directory

      > -- config   -  services, paths and generic configs

      > -- core     - Application generic classes, interface, utils etc.

      > -- modules  - All of our application modules, each module should be handle as separate unit for code sharing or export to micro-service.
      > Application bootstrap

## Documentation

You can find further information on [Sugoi official website](http://www.sugoijs.com)
