const mongoose=require("mongoose")

const url=new mongoose.Schema({
  shortUrl:{
    type:String,
    unique:true,
    required:true
  },
  redirectUrl:{
    type:String,
    required:true
  },
  totalVisits:[{ timestamps:{type:Number} }]
},{timestamps:true})

const URL=mongoose.model("url",url)

module.exports=URL