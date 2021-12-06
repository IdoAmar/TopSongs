const express = require('express');
const req = require('express/lib/request');
const app = express();
const router = express.Router();
app.use(express.json())

app.use("/api", router);

const userController = require('./controllers/user-controller');
router.use("/user", userController);
const songController = require("./controllers/songs-controller");
router.use("/song", songController);

const server = app.listen(3000, () => console.log("server is running on port 3000"));