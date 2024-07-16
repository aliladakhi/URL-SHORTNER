const express=require("express")
const connectDB=require("./connection")
const app=express()
const userRouter=require("./Routes/users");
const dashRouter = require("./Routes/dsahboard");
require('dotenv').config();

connectDB(process.env.DB_URL)
.then(()=>{console.log("DB connected");})
.catch((err)=>{console.log(err);})

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false})) //to support form data





app.use("/users",userRouter)
app.use("/dashboard",dashRouter)


app.listen(process.env.PORT,()=>{
  console.log("Server Connected");
})