import http, { Server } from "http";

import route from "./route/router"
/*
implement your server code here
*/

const HOST_NAME = "localhost";

const server: Server = http.createServer(route);

server.listen(3005, HOST_NAME,() => {
  console.log(`server running on port 3005`)
});