const express = require("express");
const app = express();
const path = require("path");
const port = 4000;

const DataModal = require("./models/book_data");
const DataBase = require("./config/DataBase");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("./pages/insert");
});

app.post("/insert", (req, res) => {
  const { name, dsc, author, publisher, price, url } = req.body;
  console.log(dsc);
  DataModal.create({
    name,
    dsc,
    author,
    publisher,
    price,
    url,
  })
    .then((data) => {
      console.log("Data Successfully Added...", data);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.get("/show", (req, res) => {
  DataModal.find({})
    .then((data) => {
      console.log(data);
      res.render("./pages/show", { data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/delete", (req, res) => {
  DataModal.findByIdAndDelete(req.query.id)
    .then((data) => {
      console.log("Data Deleted Succesfully", data);
      res.redirect("back");
    })
    .catch((err) => {
      console.log("Error In Deleting", err);
    });
});

app.get("/edit", (req, res) => {
  DataModal.findById(req.query.id)
    .then((data) => {
      res.render("./pages/edit", { data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  const { id,name, dsc, author, publisher, price, url } = req.body;
  DataModal.findByIdAndUpdate(id, {
    name,
    dsc,
    author,
    publisher,
    price,
    url,
  })
    .then((data) => {
      console.log("Data Updated", data);
      res.redirect("show");
    })
    .catch((err) => {
      console.log("Error In Updating", err);
    });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("http://localhost:4000");
});
