const mongoose=require("mongoose")

const user=new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true
  },
  userType:{
    type:String,
    required:true,
    default:"STANDARD"
  }
},{timestamps:true})

const User=mongoose.model("user",user)

module.exports=User