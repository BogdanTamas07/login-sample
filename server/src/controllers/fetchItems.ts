import passport from "passport";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

const { Items } = require("../sequelize");
const { Routes } = require("../constants/index");

module.exports = (app: any) => {
  app.get(Routes.Items, (req: any, res: any, next: any) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: any, info: any) => {
        if (err) {
          return res.status(500).send("Internal server error");
        }
        if (info !== undefined) {
          res.status(401).send(info.message);
        } else if (user.username === req.query.username) {
          Items.findAll().then((items: any[]) => {
            if (items.length != null) {
              return res.status(200).send({
                items,
              });
            }

            res.status(401).send("Items could not be fetched");
          });
        } else {
          res.status(403).send("You are not authorized");
        }
      }
    )(req, res, next);
  });
};
