const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.jk7pgvw.mongodb.net/?retryWrites=true&w=majority`;

// const uri = "mongodb://localhost:27017";

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

async function getToys() {
  try {
    await client.connect();
    const result = await toysCollection.find().toArray();
    return result;
  } catch (e) {
    return e;
  }
}

const getToyById = async (id) => {
  await client.connect();
  const query = {
    _id: new ObjectId(id),
  };
  try {
    const user = await toysCollection.findOne(query);
    return user;
  } catch (e) {
    console.log("error", e);
  } finally {
    await client.close();
  }
};

// run().catch(console.dir);
module.exports = {
  connect,
  getToys,
  getToyById,
};
