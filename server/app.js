// ./app.js
const express = require("express");
const mountRoutes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*"
};

// ... more express setup stuff can follow
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors(corsOptions));

mountRoutes(app);

app.use(express.static("../client/build"));

app.get("/api", (req, res) => {
  res.json({ info: "to-do-list API" });
});

const port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`App running on port: ${port}.`);
});
