// reference: https://www.bezkoder.com/react-node-express-mongodb-mern-stack/
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import session from 'express-session';
import userController from "./controller/user-controller.js";
import commentController from "./controller/comment-controller.js";
import creatorController from "./controller/creator-controller.js";
import podcastController from "./controller/podcast-controller.js";
import reviewController from "./controller/review-controller.js";
const app = express();
app.set('trust proxy', 1);
let sess = {
  secret: 'secret',
  cookie: { }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/podcastapp');
app.get('/', (req, res) =>
{res.send('Welcome to Full Stack Development!')})

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  headers: ['Authorization', 'X-Requested-With', 'Content-Type']
}));

userController(app);
commentController(app);
creatorController(app);
podcastController(app);
reviewController(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
