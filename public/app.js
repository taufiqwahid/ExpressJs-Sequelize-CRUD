// import express
const express = require("express");
// initialisasi
const app = express();
const db = require("./config/db");
const User = require("./models/User");

// membuka port express terkoneksi di port 4500
app.listen(4500, () => {
  console.log("Port berjalan di 4500 ");
});

//authentication connect database
db.authenticate().then(() => {
  console.log("Berhasil terkoneksi dengan database");
});

//
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request Type : ", req.method);
  console.log("Request URL : ", req.originalUrl);
  next();
});

app.get("/", (req, res) => {
  res.send("Response nodejs Berhasil");
});

app
  .route("/crud")
  .post(async (req, res) => {
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
  })
  .get(async (req, res) => {
    try {
      const getAllUser = await User.findAll({});
      res.json(getAllUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  });

app
  .route("/crud/:id")
  .get(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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
  })
  .put(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const id = req.params.id;
      const updateUser = await User.update(
        {
          username,
          email,
          password,
        },
        { where: { id: id } },
      );

      await updateUser;
      res.json(`Data dengan ID : ${id} Berhasil di Update`);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  });
