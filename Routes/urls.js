const express = require("express");
const shortid = require("shortid");
const URL = require("../Models/url");
const urlRouter = express.Router();

urlRouter
  .route("")
  .post(async (req, res) => {
    const redirectUrl = req.body.url;
    const urlEntry = await URL.create({
      shortUrl: shortid(8),
      redirectUrl,
      totalVisits: [],
      owner:req.user
    });
    const urls=await URL.find({owner:req.user})
    return res.render("../views/Home.ejs",{urls});
  })
  .get(async (req, res) => {
    const urls = await URL.find({owner:req.user});
   return res.render("../views/Home.ejs", {urls})
  });

  urlRouter.route("/:id").get(async (req, res) => {
  const shortid = req.params.id;
  try {
    const getUrl = await URL.findOneAndUpdate(
      { shortUrl: shortid,owner:req.user._id },
      {
        $push: {
          totalVisits: { timestamps: Date.now() },
        },
      }
    );
    res.redirect(getUrl.redirectUrl);
  } catch (error) {
    return res.redirect("http://localhost:7000/urls");
  }

});

urlRouter.route("/analytic/:id").get(async (req, res) => {
  try {
    const shortid = req.params.id;
    console.log(`Fetching analytics for shortUrl: ${shortid}`);

    const urlInfo = await URL.findOne({ shortUrl: shortid,owner:req.user._id });
    console.log(`Database query result: ${urlInfo}`);

    if (!urlInfo) {
      console.error(`URL not found for shortUrl: ${shortid}`);
      return res.status(404).send("URL not found");
    }
    res
      .status(200)
      .json({
        total_visits: urlInfo.totalVisits.length,
        timestamps: urlInfo.totalVisits,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = urlRouter;
