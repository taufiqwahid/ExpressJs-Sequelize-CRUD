const express = require("express");
const app = express();

const db = require("./config/db");
const User = require("./models/User");

app.listen(4500, () => {
  console.log("Port berjalan di 4500 ");
});

db.authenticate().then(() => {
  console.log("Berhasil terkoneksi dengan database");
});

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Response nodejs Berhasil");
});

app.post("/crud", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/crud", async (req, res) => {
  try {
    const getAllUser = await User.findAll({});
    res.json(getAllUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await User.findOne({
      where: { id: id },
    });
    res.json(getUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.destroy({
      where: { id: id },
    });
    await deleteUser;
    res.json(`data dari ID : ${id} Berhasil dihapus`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Eror");
  }
});
