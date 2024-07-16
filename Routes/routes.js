const express = require("express");
const shortid = require("shortid");
const URL = require("../Models/url");

const router = express.Router();

router.route("")
.post(async (req, res) => {
  const redirectUrl = req.body.url;
  const urlEntry = await URL.create({
    shortUrl: shortid(8),
    redirectUrl,
    totalVisits: [],
  });
  return res.status(200).send(urlEntry);
})
.get(async (req, res) => {
  const users=await URL.find()
  return res.status(200).send(users);
});



router.route("/:id")
.get(async (req, res) => {
  const shortid = req.params.id;
  const getUrl = await URL.findOneAndUpdate(
    { shortUrl: shortid },
    {
      $push: {
        totalVisits: {timestamps:Date.now()},
      },
    }
  );
  res.redirect(getUrl.redirectUrl);
});



router.route("/analytic/:id")
  .get(async (req, res) => {
    try {
      const shortid = req.params.id;
      console.log(`Fetching analytics for shortUrl: ${shortid}`);
      
      const urlInfo = await URL.findOne({ shortUrl: shortid });
      console.log(`Database query result: ${urlInfo}`);

      if (!urlInfo) {
        console.error(`URL not found for shortUrl: ${shortid}`);
        return res.status(404).send('URL not found');
      }
       res.status(200).json({ total_visits: urlInfo.totalVisits.length, timestamps: urlInfo.totalVisits });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
