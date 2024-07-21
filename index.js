const express=require("express")
const connectDB=require("./connection")
const cookieParser = require("cookie-parser");
const app=express()
const urlRouter=require("./Routes/urls");
const userRouter = require("./Routes/user");
const dashRouter = require("./Routes/dsahboard");
const {checkAuth,redirect}=require("./middlewares/auth")
require('dotenv').config();

connectDB(process.env.DB_URL)
.then(()=>{console.log("DB connected");})
.catch((err)=>{console.log(err);})

app.set("view engine","ejs")
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:false})) //to support form data
app.use(checkAuth)

app.use("/urls",redirect(["STANDARD","ADMIN"]),urlRouter)
app.use("/user", userRouter);
app.use("/dashboard",redirect(["ADMIN"]),dashRouter)


app.listen(process.env.PORT,()=>{
  console.log("Server Connected");
})