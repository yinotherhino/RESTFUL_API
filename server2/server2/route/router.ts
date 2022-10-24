import { IncomingMessage, ServerResponse } from 'http';
import https from 'https';

import reqErrorHandler from '../services/errorhandler.services';
import extractData from '../services/extractData.services';
/*
implement your server code here
*/

const HOST_NAME = "localhost";
const PORT = 3001;


const route = async (req: IncomingMessage, res: ServerResponse) => {
    try{
    if (req.method === "GET") {
      res.end(JSON.stringify({ status: 404,
    message: "Make a post request with the https url you want to scrap."
    }));
    }

    if (req.method === "POST") {
      let url = '';

      req.on('data', (data)=>{
        url = JSON.parse(data.toString()).url;
        url = url.startsWith("https") ? url: `https://${url}`;
        console.log(url);

        https.get(url, urlRes=>{
          let data: string;
          urlRes.on('data', (chunk)=>{
            data += chunk.toString();
          })

          urlRes.on('end', ()=>{
            let head:string = data.slice(data.indexOf("<head>"), data.indexOf("</head>"));
            let titleTagIndex: number = head.indexOf("<title");
            let titleTagCloseIndex: number = head.indexOf("/title>");
            let title: string = head.slice(titleTagIndex, titleTagCloseIndex);

            let descriptions: Array<string> = []

            while(head.includes("description")){

              let descIndex: number = head.indexOf("description");
              let descCloseTag: number = head.indexOf(">", descIndex);
              let description:string = head.slice(descIndex, descCloseTag);
              descriptions.push(description);
              head = head.slice(descCloseTag+1);
            }

            let dataArr: Array<string> = data.split(" ").map(item => item.trim())
            dataArr.forEach((item, index)=>{
              if(item == ''){
                dataArr.splice(index,1)
              }
            })
            let dataStr: string = dataArr.join(" ")
            let images : Array<string>= [];

            while(dataStr.includes("img")){
              let imageTagIndex : number = dataStr.indexOf("<img");
              let imageTagCloseIndex = dataStr.indexOf("/>", imageTagIndex)
              let image= dataStr.slice(imageTagIndex, imageTagCloseIndex)
              images.push(image);
              dataStr = dataStr.slice(imageTagCloseIndex+1)
            }

            let response = extractData(images, title, descriptions);

            res.end(JSON.stringify(response, null, "  "))
          })

          urlRes.on('error', (err)=>{
            console.error(err)
          })
        })
        
      })


      reqErrorHandler(req, res)
    }
  }

catch(err){
  console.log(err)
}
  }

export default route;