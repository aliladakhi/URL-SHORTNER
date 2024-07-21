const express=require("express")
const User = require("../Models/user");
const {setMap}=require("../utilities/tokens")
const userRouter = express.Router();

userRouter.route("/").get((req,res)=>{
  return res.render("../views/Sign-up.ejs")
})
userRouter.route("/Login")
.get((req,res)=>{
  return res.render("../views/Login.ejs")
})
.post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.send("Invalid credentials");
    } else {
      const sessionId=setMap(user)
      res.cookie("sessionId",sessionId);
      return res.redirect("http://localhost:7000/urls");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("An error occurred during login");
  }
});

userRouter.route("/Sign-up").post(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return res.redirect("http://localhost:7000/user/Login");
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error occurred during sign up.");
  }
})


module.exports = userRouter;
