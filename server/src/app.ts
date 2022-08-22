import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import "dotenv/config";

const app = express();

const API_PORT = process.env.API_PORT || 8000;

require("./config/passportConfig");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./controllers/login")(app);
require("./controllers/register")(app);
require("./controllers/resetPassword")(app);
require("./controllers/fetchUser")(app);
require("./controllers/forgotPassword")(app);
require("./controllers/fetchItems")(app);
require("./controllers/addItem")(app);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;
