// reference: https://www.bezkoder.com/react-node-express-mongodb-mern-stack/
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
// const bodyParser = require("body-parser");
import userController from "./controller/user-controller.js";
import commentController from "./controller/comment-controller.js";
const app = express();
const session = require('express-session');
app.set('trust proxy', 1);
let sess = {
  secret: 'fake secret',
  cookie: { secure: false }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/podcastapp');
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})


// var corsOptions = {
//   origin: "http://localhost:4000"
// };
// app.use(cors(corsOptions));
// app.use(cors);
app.use(cors({
  allowedOrigins: ['*'],
  headers: ['Authorization', 'X-Requested-With', 'Content-Type']
}));

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

userController(app);
commentController(app);

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to our application." });
// });

// set port, listen for requests
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// const db = require("./app/models");
// db.mongoose
//     .connect(db.url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     .then(() => {
//       console.log("Connected to the database!");
//     })
//     .catch(err => {
//       console.log("Cannot connect to the database!", err);
//       process.exit();
//     });