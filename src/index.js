// external module
const express = require("express");
const cors = require("cors");

// internal module
const { connect, getToyById, getToys } = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

// call middleware function
app.use(cors());
app.use(express.json());

// connect to database
connect();

app.get("/", (req, res) => {
  res.send({ msg: "welcome to toyland server" });
});

app.get("/toys", async (req, res) => {
  const toys = await getToys();
  res.send(toys);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
