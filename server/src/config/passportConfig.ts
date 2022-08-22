import bcrypt from "bcrypt";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy } = require("passport-jwt");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { BCRYPT_SALT_ROUNDS } = require("../constants/index");
const { User } = require("../sequelize");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    (req: any, username: string, password: string, done: any) => {
      try {
        User.findOne({
          where: {
            [Op.or]: [
              {
                username,
              },
              { email: req.body.email },
            ],
          },
        }).then((user: any) => {
          if (user != null) {
            return done(null, false, {
              message: "username or email already taken",
            });
          }
          bcrypt
            .hash(password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword: string) => {
              User.create({
                username,
                password: hashedPassword,
                email: req.body.email,
              }).then((user: any) => {
                return done(null, user);
              });
            });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username: string, password: string, done: any) => {
      try {
        User.findOne({
          where: {
            username,
          },
        }).then((user: any) => {
          if (user === null) {
            return done(null, false, { message: "Wrong username" });
          }
          bcrypt.compare(password, user.password).then((response: any) => {
            if (response !== true) {
              return done(null, false, { message: "Wrong Password" });
            }
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: "jwt-secret",
};

passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload: { id: string }, done: any) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then((user: any) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (err) {
      console.error(err);
      done(err);
    }
  })
);
