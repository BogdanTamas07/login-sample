const Sequelize = require("sequelize");
const UserModel = require("./models/userModel");
const ItemModel = require("./models/itemModel");

const sequelize = new Sequelize(
  "mydb",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const User = UserModel(sequelize, Sequelize);
const Items = ItemModel(sequelize, Sequelize);

sequelize.sync().then();

module.exports = { User, Items };
