import passport from "passport";
import bcrypt from "bcrypt";

const { BCRYPT_SALT_ROUNDS, Routes } = require("../constants/index");
const { User } = require("../sequelize");

module.exports = (app: any) => {
  app.put(Routes.ResetPassword, (req: any, res: any) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, _user: any, info: any) => {
        if (err) {
          return res.status(500).send("Authentication System Error");
        }
        if (info) {
          return res.status(500).send(info.message);
        }

        User.findOne({
          where: {
            email: req.body.email,
          },
        }).then((userInfo: any) => {
          if (userInfo) {
            bcrypt
              .hash(req.body.password, BCRYPT_SALT_ROUNDS)
              .then((password: string) => {
                userInfo.update({
                  password,
                  updatedAt: Date.now(),
                });
              })
              .then(() => {
                const { id, email, username } = userInfo;
                res.status(200).send({
                  auth: true,
                  message: "Password was changed successfully",
                  userInfo: {
                    id,
                    email,
                    username,
                    token: req.headers["authorization"].split(" ")[1],
                  },
                });
              });
          } else {
            return res.status(404).json("User not found");
          }
        });
      }
    )(req, res);
  });
};
