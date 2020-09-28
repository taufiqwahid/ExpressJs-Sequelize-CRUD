// initialitation ORM
const { Sequelize } = require("sequelize");

const db = require("../config/db");

// create database with define name table user and type value
const User = db.define(
  "user",
  {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  },
  {
    // fail add name table with S
    freezeTableName: true,
  },
);

module.exports = User;
