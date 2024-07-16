const express=require("express")
const URL =require("../Models/url")

const dashRouter=express.Router()

dashRouter.route("/")
.get(async(req,res)=>{
  const users=await URL.find()
  res.render("../views/Home.ejs",{shortid:null, users})
})

module.exports=dashRouter