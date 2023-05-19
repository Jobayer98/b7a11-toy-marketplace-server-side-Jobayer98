// external module
const express = require("express");
const cors = require("cors");

// internal module
const { getToyById, getToys, addNewToy, updateToy } = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

// call middleware function
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "welcome to toyland server" });
});

// get all toys
app.get("/toys", async (req, res) => {
  const toys = await getToys();
  res.send(toys);
});

// get a specific toy
app.get("/toys/:toyId", async (req, res) => {
  const id = req.params.toyId;
  const toy = await getToyById(id);

  res.send(toy);
});

// add a new toy
app.post("/toys", async (req, res) => {
  const data = req.body;

  const result = await addNewToy(data);
  res.send(result);
});

// update a toy
app.patch("/toys/:toyId", async (req, res) => {
  const id = req.params.toyId;
  const data = req.body;

  const result = await updateToy(id, data);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
