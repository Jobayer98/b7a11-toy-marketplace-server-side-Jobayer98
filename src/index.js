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
  totalToy,
} = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

// call middleware function
app.use(cors());
app.use(express.json());

// verify token
const verify_jwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .send({ error: true, message: "unauthorized accesss" });
    }
    req.decoded = decoded;
    next();
  });
};

app.get("/", (req, res) => {
  res.send({ msg: "welcome to toyland server" });
});

// generate a token
app.post("/jwt", (req, res) => {
  const data = req.body;
  const token = jwt.sign(data, process.env.SECRET_KEY);
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

// get total number of toys
app.get("/total-toy", async (req, res) => {
  const result = await totalToy();

  if (!result) {
    return res.status(404).send("No toy found");
  }
  res.send({ totalToy: result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
