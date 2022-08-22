import passport from "passport";

const { User } = require("../sequelize");
const { Routes } = require("../constants/index");

module.exports = (app: any) => {
  app.get(Routes.User, (req: any, res: any, next: any) => {
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
          User.findOne({
            where: {
              username: req.query.username,
            },
          }).then((userData: any = null) => {
            if (userData != null) {
              return res.status(200).send({
                email: userData.email,
                username: userData.username,
              });
            }

            res.status(401).send("User does not exists");
          });
        } else {
          res.status(403).send("Wrong credentials");
        }
      }
    )(req, res, next);
  });
};
