const mongoose =require("mongoose");
require("dotenv").config();

const mongooseOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  };

  const mongoDBUrl = 'mongodb://localhost:27017/yourdatabasename';
exports.dbconnect = ()=>{
 
        mongoose.connect(mongoDBUrl,mongooseOptions)
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