// reference: https://www.bezkoder.com/react-node-express-mongodb-mern-stack/
import express from 'express';
import cors from 'cors';
// const bodyParser = require("body-parser");
import userController from "./controller/user-controller.js";
const app = express();
app.use(express.json());
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

var corsOptions = {
  origin: "http://localhost:4000"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

userController(app);

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