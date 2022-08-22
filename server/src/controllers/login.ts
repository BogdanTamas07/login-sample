import jwt from "jsonwebtoken";
import passport from "passport";

const { User } = require("../sequelize");
const { Routes } = require("../constants/index");

module.exports = (app: any) => {
  app.post(Routes.Login, (req: any, res: any, next: any) => {
    passport.authenticate("login", (err, users, info) => {
      if (err) {
        return res.status(500).send("Authorization System Error");
      }
      if (info !== undefined) {
        return res.status(403).send(info.message);
      } else {
        req.logIn(users, () => {
          User.findOne({
            where: {
              username: req.body.username,
            },
          }).then((user: any) => {
            const token = jwt.sign({ id: user.id }, "jwt-secret");

            const {
              dataValues: { id, username, email },
            } = user;

            res.status(200).send({
              auth: true,
              userInfo: {
                id,
                username,
                email,
                token,
              },
              message: "Login Successfully",
            });
          });
        });
      }
    })(req, res, next);
  });
};
