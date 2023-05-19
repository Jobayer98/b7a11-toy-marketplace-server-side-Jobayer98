// external module
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// internal module
const {
  getToyById,
  getToys,
  addNewToy,
  updateToy,
  deleteToy,
} = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

// call middleware function
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "welcome to toyland server" });
});

// generate a token
app.post("/jwt", (req, res) => {
  const data = req.body;
  const token = jwt.sign(data, "mySecret");
  res.send({ token });
});

// get all toys
app.get("/toys", async (req, res) => {
  const toys = await getToys();

  if (!toys) {
    return res.status(404).send({ status: false, message: "Toys not found" });
  }
  res.send(toys);
});

// get a specific toy
app.get("/toys/:toyId", async (req, res) => {
  const id = req.params.toyId;
  const toy = await getToyById(id);

  if (!toy) {
    return res.status(404).send({ status: false, message: "Toys not found" });
  }
  res.send(toy);
});

// add a new toy
app.post("/toys", async (req, res) => {
  const data = req.body;

  const result = await addNewToy(data);

  if (!result.insertedId) {
    return res
      .status(400)
      .send({ status: false, message: "Failed to add toy" });
  }
  res.status(200).send({ status: true, message: "Added successfuly" });
});

// update a toy
app.patch("/toys/:toyId", async (req, res) => {
  const id = req.params.toyId;
  const data = req.body;

  const result = await updateToy(id, data);

  if (!result.modifiedCount > 0) {
    return res.status(404).send({ status: false, message: "Toy not found" });
  }
  res.status(200).send({ status: true, message: "Updated successfuly" });
});

// delete a toy
app.delete("/toys/:toyId", async (req, res) => {
  const id = req.params.toyId;

  const result = await deleteToy(id);

  if (!result.deletedCount > 0) {
    return res.status(404).send({ status: false, message: "Toy not found" });
  }

  res.status(200).send({ status: true, message: "Deleted successfuly" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
