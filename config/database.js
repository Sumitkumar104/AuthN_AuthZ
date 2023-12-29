const mongoose =require("mongoose");
require("dotenv").config();

exports.dbconnect = ()=>{
 
        mongoose.connect(process.env.mongodburl)
        .then(
           ()=>{console.log("your connection with database is successfull created")}
        )   
    .catch( (err)=>{
        console.log("there is something error to  connection with database");
        console.error(err);
        process.exit(1);    
    }
    )
}