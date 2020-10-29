const express = require("express");
const path = require("path");
const  fs  = require("fs");
let app = express();


app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from the web server side...");
});
app.use("/static", express.static(path.join(__dirname,"public")));

app.post("/contact-form", (req, res) => {
  let getInfo = {
    name: req.body.name,
   real: req.body.real,
  }
  let info = JSON.stringify(getInfo);
  fs.appendFileSync("./getInfo.json", info, (err) => {
    if (err) throw err;
    console.log("worked")
    //res.send("interesting...");
  });
  res.redirect("/formsubmissions");
});
app.get("/formsubmissions", (req, res) => {
  fs.readFile("./getInfo.json", (err, info) => {
    res.type("text").send(info);
  });
});
app.listen(3006);

// app.get('/', (req, res, next) => {
// res.sendFile(path.join(__dirname, "../public/index.html"));
// });


