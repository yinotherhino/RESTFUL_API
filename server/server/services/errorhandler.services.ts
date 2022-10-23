import { IncomingMessage, ServerResponse } from "http";

const reqErrorHandler = (req: IncomingMessage, res: ServerResponse)=>{
    req.on('error', (error)=>{
        console.error("An error Occured.")
        res.end("An Error Occured, please try again later.")
    })
}

export default reqErrorHandler;