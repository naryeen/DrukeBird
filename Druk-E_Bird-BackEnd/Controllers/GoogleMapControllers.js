// const express = require('express');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;

//const app = express();
//const port = 3000;
//const mongoUrl = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL
//const dbName = 'your-database-name'; // Replace with your MongoDB database name
const collectionName = 'locations'; // Replace with your MongoDB collection name

app.use(bodyParser.json());

app.post('/api/locations', (req, res) => {
  const locationData = req.body;

  MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }

    // const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.insertOne(locationData, (err) => {
      if (err) {
        console.error('Error inserting location into MongoDB:', err);
        res.status(500).json({ error: 'Failed to insert location into database' });
      } else {
        console.log('Location inserted successfully');
        res.status(200).json({ success: true });
      }

      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});