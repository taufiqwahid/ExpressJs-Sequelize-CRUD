const sequelize = require("sequelize");

// initialisation witch using database dengan ORM sequelize
const db = new sequelize("crudnodejs", "root", "", {
  // dialect database connection
  dialect: "mysql",
});

db.sync({});

module.exports = db;
