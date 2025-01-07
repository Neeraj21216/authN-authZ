
const mongoose=require("mongoose");
//u need a schem
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]

    }

})
module.exports=mongoose.model("user",userSchema);