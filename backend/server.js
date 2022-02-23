const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const path = require("path");
const cors = require("cors");
const shortid = require("shortid");
const validUrl = require("valid-url");
const config = require("config");
const Url = require("./models/Url.js");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true })); //why do i need this and the repo does not have it?
app.use(express.static(path.join(__dirname, "../client/public")));
// console.log(">dirname", __dirname);

//create short ulr
app.post("/shorten", async (req, res) => {
  const urlCode = shortid.generate();
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  // check base url
  //   if (!validUrl.isUri(baseUrl)) {
  //     return res.status(401).json("Invalid base url");
  //   }

  //check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        let shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save().then((res) => console.log("hwere", res));
        res.status(200).json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

//get short url and redirect
app.get("/shorten/:urlcode", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlcode });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

app.delete("/shorten", async(req, res) => {
  try {
   const url =  await Url.deleteOne(req.body , function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
   if(url) {
    return res.json(url)
   } else {
       return res.status(404).json("No url")
   }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});
app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
