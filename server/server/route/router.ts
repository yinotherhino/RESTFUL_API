import fs from 'fs';
import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";

import checkDb from '../services/checkDb.services'
import Database from "../interfaces/database.interface";
import reqErrorHandler from '../services/errorhandler.services';


const databasePath = path.join("./database.json");

const route = async (req: IncomingMessage, res: ServerResponse) => {
        try {
          await checkDb();
          const readingDb = fs.createReadStream(databasePath, 'utf-8');
      
          if (req.method === "GET") {
            fs.readFile(databasePath, 'utf-8', (err, file)=>{
              if(!err){
                let data = file.toString()
                res.statusCode
                res.end(data);
              }
              
            } )
          }
          
      
          if (req.method === "POST") {
            let database: Database = [];
            req.on('data', (clientData)=>{
      
              readingDb.on('data', (databaseData)=>{
                database = (JSON.parse(databaseData.toString()));
                let postData = JSON.parse(clientData.toString());
                if(Array.isArray(database)){
                database.push(postData);
                }
                else{
                  return;
                }
                console.log(database);
      
                fs.writeFile(databasePath, JSON.stringify(database, null, "  "), (err)=>{
                  if(err){
                    console.error(err);
                    
                    res.end("An error Occured, Couldn't post data.")
                  }
                  else{
                    res.end(JSON.stringify({
                      message: "Data Added Successfully",
                      data: postData,
                      status: 201
                    }, null, "  "))
                  }
                });
                
              })
            })
            
            reqErrorHandler(req, res);
            
          }
      
          if (req.method === "PUT") {
            let database: Database = [];
      
            req.on('data', (clientData)=>{
      
              readingDb.on('data', (databaseData)=>{
                database = (JSON.parse(databaseData.toString()));
                let postData = JSON.parse(clientData.toString());
                if(Array.isArray(database)){
                  database.forEach((item, index)=>{
                    if( Number(item.id) === Number(postData.id) ){
                      database[index]= {...database[index],...postData}
                    }
                  })
                }
      
                fs.writeFile(databasePath, JSON.stringify(database, null, "  "), (err)=>{
                  if(err){
                    console.error(err);
                    
                    res.end("An error Occured, Couldn't post data.")
                  }
                  else{
                    res.end(JSON.stringify({
                      message: "Data Uodated Successfully",
                      data: postData,
                      status: 201
                    }, null, "  "))
                  }
                });
                
              })
      
            })

            reqErrorHandler(req, res);
      
          }
      
          if (req.method === "DELETE") {
            let database: Database = [];
      
            req.on('data', (clientData)=>{
      
              readingDb.on('data', (databaseData)=>{
                database = (JSON.parse(databaseData.toString()));
                let postData = JSON.parse(clientData.toString());
                if(Array.isArray(database)){
                  database.forEach((item, index)=>{
                    if( Number(item.id) === Number(postData.id) ){
                      database.splice(index, 1)
                    }
                  })
                }
                
                fs.writeFile(databasePath, JSON.stringify(database, null, "  "), (err)=>{
                  if(err){
                    console.error(err);
                    
                    res.end("An error Occured, Couldn't post data.")
                  }
                  else{
                    res.end(JSON.stringify({
                      message: "Data Deleted Successfully",
                      data: postData,
                      status: 201
                    }, null, "  "))
                  }
                });
                
              })
      
            })

            reqErrorHandler(req, res);
      
          }
      
        } catch (error) {
          console.error(`Error: ${error}`)
          res.end("Oooops! Unknown Error Occured!")
        }
         
    
      
}



    


export default route;