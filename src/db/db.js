const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.jk7pgvw.mongodb.net/?retryWrites=true&w=majority`;

// connect to database uri for local
const uri = "mongodb://127.0.0.1:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const toysCollection = client.db("toyLandDB").collection("toys");

const connect = async () => {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    console.log(e);
  }
};

// connect to database
connect();

// read all toys
async function getToys() {
  try {
    const result = await toysCollection.find().toArray();
    return result;
  } catch (e) {
    return e;
  }
}

// read toy by id
const getToyById = async (id) => {
  const query = {
    _id: new ObjectId(id),
  };
  try {
    const user = await toysCollection.findOne(query);
    return user;
  } catch (e) {
    console.log("error", e);
  }
};

// add a new toy
const addNewToy = async (data) => {
  try {
    const result = toysCollection.insertOne(data);
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getToys,
  getToyById,
  addNewToy,
};
