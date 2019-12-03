const express = require("express");
const cors = require("cors");
const monk = require("monk");
const app = express();
const Filter = require("bad-words");
const db = monk("localhost/twitter-clone");
const data = db.get("data");
const filter = new Filter();
const rateLimit = require("express-rate-limit");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Twitter Clone"
  });
});

app.get("./data", (req, res) => {
  data.find().then(data => {
    res.json(data);
  });
});

function isValidData(data) {
  return (
    data.name &&
    data.name.toString().trim() !== "" &&
    data.content &&
    data.content.toString().trim() !== ""
  );
}

app.use(
  rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
  })
);

app.post("./capturedFormData", (req, res) => {
  if (isValidData(req, body)) {
    const data = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: new Date()
    };
    data.insert(data).then(createdData => {
      res.json(createdData);
    });
  } else {
    res.status(422);
    res.json({
      message: "Name and content are required!"
    });
  }
});
app.listen(4000, () => {
  console.log("listening on port 4000");
});
