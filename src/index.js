// external module
const express = require("express");
const cors = require("cors");

// internal module
const { getToyById, getToys, addNewToy } = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

// call middleware function
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "welcome to toyland server" });
});

app.get("/toys", async (req, res) => {
  const toys = await getToys();
  res.send(toys);
});

app.get("/toys/:toyId", async (req, res) => {
  const id = req.params.toyId;
  const toy = await getToyById(id);
  console.log(toy);
  res.send(toy);
});

app.post("/toys", async (req, res) => {
  const data = req.body;
  //   console.log(data);

  const result = await addNewToy(data);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
