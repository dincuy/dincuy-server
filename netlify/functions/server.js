require("dotenv").config();
const express = require("express");
// const path = require("path");
const app = express();
const serverless = require("serverless-http");
const cors = require("cors");
const corsOptions = require("../../config/corsOptions");
const { updateDataProduct } = require("../../controllers/productController");
const scrapFromUrl = require("../../utils/scrapFromUrl");
const sourceUrls = require("../../sourceUrls");
const { setDoc, doc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../../config/firebase");

app.use(cors(corsOptions));

app.set("view engine", "ejs");

// timer dalam milidetik
// 24 jam
const timer = updateDataProduct(360000);

app.get("/", (req, res) => {
  res.render("index", { timer: timer });
});

const fetchUpdate = () => {
  let pesanUpdate = ''
  const products = ["pulsa", "paket-internet", "voucher-internet"];
  for (let i in products) {
    scrapFromUrl(sourceUrls, products[i]).then(async (data) => {
      const newDataUpdate = [];
      try {
        await setDoc(doc(db, "products", products[i]), {
          data,
          updatePada: serverTimestamp(),
        });
        console.log(`update data product ${products[i]} suksess`);
        newDataUpdate.push({ [products[i]]: `update sukses` });

        if (products[i] === products[products.length -1]) {
          return "Data sukses di update"
        }
      } catch (error) {
        console.log(error.message);
        newDataUpdate.push({ [products[i]]: `update gagal` });
      }
    }).then((data) => pesanUpdate = data)
  }
};

// update firestore
app.get("/update", (req, res) => {
  const data = fetchUpdate();
  res.json({ data: data });
});

app.use("/checkout", require("../../routes/checkout"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

module.exports.handler = serverless(app)
