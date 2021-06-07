import express from "express";
import data from "./data";
import userRoute from "./routes/createUserRoutes";
import bodyParser from "body-parser";
import config from "./config";
const mongoose = require("mongoose");

const mongodbUrl = config.MONDGODB_URL


mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => console.log("mongoDB has connected"))
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) res.send(product);
  else res.status(404).send({ msg: "Product not found =(" });
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("connected to server at localhost:5000");
});
