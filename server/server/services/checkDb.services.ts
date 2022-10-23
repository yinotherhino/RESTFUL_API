import fs from 'fs';
import path from 'path';

const checkDb = async ()=>{
    const database = path.join("./database.json");
  
    let hasDb: boolean = false;
    if(fs.existsSync(database)){
      hasDb = true;
    }
  
    if(!hasDb){
      fs.writeFile(database, JSON.stringify([{"organization": "node ninja",
      "createdAt": "2020-08-12T19:04:55.455Z", 
      "updatedAt": "2020-08-12T19:04:55.455Z",
      "products": ["developers","pizza"],
      "marketValue": "90%",
      "address": "sangotedo",
      "ceo": "cn",
      "country": "Taiwan",
      "id": 1,"noOfEmployees":2,
      "employees":["james bond","jackie chan"]
        }
      ], null, " "), 'utf-8', (err)=>{
        if(err){
          console.log(err)
          return;
        }
        else{
        console.log("Database Created Successfully!");
        hasDb = true
        }
      })
    }
  }

  export default checkDb;