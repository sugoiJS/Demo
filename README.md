# SugoiJS Framework Demo

## Introduction
SugoiJS is a minimal modular framework,

which gives you the ability to use only what you need, fast.

## Getting started

1. `git clone https://github.com/sugoiJS/demo.git`
2. `cd demo/server`
3. `npm install`
4. `npm run build` | `npm run dev` - live recompile
5. `node dist/server.js`
6. Go to `http://localhost:3000` in your browser.

## What we got inside?

1. 1 module - index module

2. 1 controller("/") - 2 paths guarded by policy and 1 unguarded:

- `GET /api/{id}/{amount}` - get and update model

    schema - {id:string//with regex "([A-Z])+"}

- `POST /api/` - update model

    schema - {amount:number//>=2}

- `GET /api/` - update background color for all connected clients

3. 1 Service:

    SocketHandlerService which handle the socket events and trigger background color change


## File structure

 - client - directory for our client project
 - assets - client project compiled & minified code
 - common - generic files which used for both client & server
 - server - directory for our server project

    -- config - webpack configs

    -- dist - compiled code

    -- src - application directory

      > -- config   - Application bootstrap, services, paths and generic configs

      > -- core     - Application generic classes, interface, utils etc.

      > -- modules  - All of our application modules, each module should be handle as separate unit for code sharing or export to micro-service.

## Documentation

You can find further information on [Sugoi official website](http://www.sugoijs.com)
