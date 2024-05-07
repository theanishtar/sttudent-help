const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const crypto = require('crypto');

const dbConfig = require("./app/config/db.config");
const fileparser = require('./app/utils/fileparser');

const app = express();

// function generateRandomKey(length) {
//   return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
// }

// const randomKey = generateRandomKey(32); // Generate a random key of length 32
// console.log(randomKey);

app.use(cors());
/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
//app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "studenthelp-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const { mongoose } = require("./app/models");

db.mongoose
  .connect(`mongodb+srv://huunghiaquach:qGb2tHhp2cE3TXB6@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Recommender System." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/department.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/comment.routes")(app);

// upload file to AWS S3
app.post('/api/upload', async (req, res) => {
  console.log("uploading file");
  await fileparser(req)
  .then(data => {
    console.log(data);
    res.status(200).json({
      message: "Success",
      data
    })
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
});

// set port, listen for requests
const PORT = process.env.PORT || 5152;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});