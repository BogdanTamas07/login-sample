import passport from "passport";

const { User } = require("../sequelize");
const { Routes } = require("../constants/index");

module.exports = (app: any) => {
  app.post(Routes.Register, (req: any, res: any, next: any) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        return res.status(500).send("Authentication System Error");
      }
      if (info !== undefined) {
        return res.status(403).send(info.message);
      } else {
        req.logIn(user, () => {
          const data = {
            email: req.body.email,
            username: user.username,
          };
          User.findOne({
            where: {
              username: data.username,
            },
          }).then((user: any) => {
            user
              .update({
                email: data.email,
              })
              .then(() => {
                res
                  .status(200)
                  .send({ message: "User Registered Successfully" });
              });
          });
        });
      }
    })(req, res, next);
  });
};
