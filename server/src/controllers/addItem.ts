import passport from "passport";

const { Items } = require("../sequelize");
const { Routes } = require("../constants/index");

module.exports = (app: any) => {
  app.put(Routes.Items, (req: any, res: any, next: any) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: any, info: any) => {
        if (err) {
          return res.status(500).send("Internal server error");
        }
        if (info !== undefined) {
          res.status(401).send(info.message);
        } else if (user.username === req.body.username) {
          Items.create({
            username: req.body.username,
            userText: req.body.userText,
            createdAt: req.body.createdAt,
          }).then((item: any) => {
            if (item) {
              return res.status(200).send({
                item,
              });
            }

            res.status(401).send("Item could not be added");
          });
        } else {
          res.status(403).send("You are not authorized");
        }
      }
    )(req, res, next);
  });
};
