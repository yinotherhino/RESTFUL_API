import http, { Server } from 'http';

import route from './route/router';
/*
implement your server code here
*/

const HOST_NAME = "localhost";
const PORT = 3001;

const server: Server = http.createServer(route);

server.listen(3001, HOST_NAME,() => {
  console.log(`server running on port ${PORT}`)
});