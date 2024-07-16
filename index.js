const express=require("express")
const connectDB=require("./connection")
const app=express()
const router=require("./Routes/routes")
require('dotenv').config();

connectDB(process.env.DB_URL)
.then(()=>{console.log("DB connected");})
.catch((err)=>{console.log(err);})


app.use(express.json())
app.use("/",router)


app.listen(process.env.PORT,()=>{
  console.log("Server Connected");
})