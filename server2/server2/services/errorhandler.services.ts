import { IncomingMessage, ServerResponse } from "http";

const reqErrorHandler = (req: IncomingMessage, res: ServerResponse)=>{
    req.on('error', (error)=>{
        res.writeHead(500, {"Content-type": "Application/json"});
        console.error("An error Occured.")
        res.end("An Error Occured, please try again later.")
    })
}

export default reqErrorHandler;