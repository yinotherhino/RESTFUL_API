# This repository Contains two projects written in typescript

#Server
A Restful API that accepts GET, POST, PUT AND DELETE requests from a client and send back a json response based on the success/failure of the request and also sends a status code based on the status of the request. Hosted on localhost port 3005.



#Server2
A web scraper hosted on the localhost port 3001, which takes one url from a client in a json object and returns the image srcs of the page, the title and also the description.



## To run the project on your machine


For server, make sure in the root directory
```sh
cd server
```

For server2, make sure in the root directory
```sh
cd server2
```

first, Clone the project

you need to install the dependencies for the project by running
```
yarn
```

Compile to javascript

```sh
yarn tsc
```

Then, you can run the server by running

```sh
yarn serve
```

Then, you can run the tests by running, The tests are written with jest and supertest

```sh
yarn test
```

#change the PORT variable in server/app.ts or server2/app.ts to modify the port.
