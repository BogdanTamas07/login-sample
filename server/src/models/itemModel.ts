module.exports = (sequelize: any, type: any) =>
  sequelize.define("item", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: type.STRING,
      allowNull: true,
    },
    userText: {
      type: type.STRING,
      allowNull: true,
    },
    createdAt: type.DATE,
  });
