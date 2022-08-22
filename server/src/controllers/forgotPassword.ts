import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const { User } = require("../sequelize");
const { Routes } = require("../constants/index");

module.exports = (app: any) => {
  app.post(Routes.ForgotPassword, async (req: any, res: any) => {
    if (!req.body.email) {
      return res.status(400).send("Email required");
    }

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user: any) => {
      if (!user) return res.status(404).send("Email does not exist");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.PERSONAL_EMAIL,
          pass: process.env.PERSONAL_EMAIL_PWD,
        },
      });

      const token = jwt.sign({ id: user.id }, "jwt-secret");

      const mailOptions = {
        from: process.env.PERSONAL_EMAIL,
        to: `${req.body.email}`,
        subject: "Link To Reset You Password",
        text: `You are receiving this because you have requested the reset of the password for your account.

          Please click the following link one hour of receiving it:
          http://localhost:3000/reset-password/${token}/${req.body.email}

          `,
      };

      transporter.sendMail(mailOptions, (err: any, response: any) => {
        if (err) {
        } else {
          res.status(200).json("Recovery email sent");
        }
      });
    });
  });
};
