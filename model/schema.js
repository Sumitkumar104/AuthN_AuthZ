const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        enum:["admin","student","visitor"],
        type:String
    }

})
const user = mongoose.model("user", userschema);

module.exports = user;