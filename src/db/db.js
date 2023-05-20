const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.jk7pgvw.mongodb.net/?retryWrites=true&w=majority`;

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
    return e;
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
    return e;
  }
};

// add a new toy
const addNewToy = async (data) => {
  try {
    const result = await toysCollection.insertOne(data);
    return result;
  } catch (e) {
    return e;
  }
};

// update a toy
const updateToy = async (id, updateData) => {
  try {
    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const updateToy = {
      $set: updateData,
    };
    console.log(updateToy);
    const result = await toysCollection.updateOne(filter, updateToy, option);

    return result;
  } catch (e) {
    return e;
  }
};

// delete a toy
const deleteToy = async (id) => {
  try {
    const query = { _id: new ObjectId(id) };
    const result = await toysCollection.deleteOne(query);

    return result;
  } catch (e) {
    return e;
  }
};

// count total number of toy
const totalToy = async () => {
  try {
    const estimate = await toysCollection.estimatedDocumentCount();
    return estimate;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getToys,
  getToyById,
  addNewToy,
  updateToy,
  deleteToy,
  totalToy,
};
