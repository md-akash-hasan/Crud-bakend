const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const db = client.db("destinationrec");
    const destioncollactionrec = db.collection("recap");

    app.post("/destination", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await destioncollactionrec.insertOne(data);
      res.json(result);
    });

    app.get("/destinations", async (req, res) => {
      let result = await destioncollactionrec.find().toArray();
      res.send(result);
    });

    app.get("/destinations/:id", async (req, res) => {
      let { id } = req.params;
      let result = await destioncollactionrec.findOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    app.patch("/destinations/:id", async (req, res) => {
      let { id } = req.params;
      let updataData = req.body;
      let result = await destioncollactionrec.updateOne(
        { _id: new ObjectId(id) },
        { $set: updataData },
      );
      res.json(result);
    });

    app.delete("/destinations/:id", async (req, res) => {
      let { id } = req.params;
      let result = await destioncollactionrec.deleteOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Bangladesh");
});
app.listen(port, () => {
  console.log(`server is rining port ${port}`);
});
