const express = require("express");
const URL = require("../Models/url");
const User = require("../Models/user");
const dashRouter = express.Router();

dashRouter.route("/").get(async (req, res) => {
  try {
    const users = await User.find({});
    const promises = users.map(async (user) => {
      const urls = await URL.find({ owner: user._id }); 
      return { user, urls };
    });

    const data = await Promise.all(promises);
    console.log(data);
  res.render("../views/dashboard.ejs", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = dashRouter;
