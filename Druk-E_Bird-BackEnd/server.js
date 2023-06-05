const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(
  cors({
    origin:"*",
    // methods: "GET, POST, DELETE, PATCH",
    // credentials: true,
  })
);

const DB = process.env.DATABASE.replace(
  "PASSWORD",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((error) => console.log(error));

const server = http.createServer(app);
const io = new Server(server);

// Set up change stream

const CheckListModel = require("./Models/CheckListModel");
const NotificationModel = require("./Models/NotificationModel");

const changeStream = CheckListModel.watch({
  $match: { "updateDescription.updatedFields.BirdName": { $exists: true } },
});
// Listen for change events
changeStream.on("change", async (change) => {
  try {
    const updatedField = change.updateDescription.updatedFields.BirdName;
    console.log(`Field 'BirdName' updated:`, updatedField);

    // Retrieve the updated checklist document from CheckListModel
    const checklist = await CheckListModel.findById(change.documentKey._id);
    console.log(checklist.userId)

    if (!checklist) {
      console.log("Checklist not found");
      return;
    }

    // Update the checklist data in CheckListModel
    await CheckListModel.updateOne(
      { _id: change.documentKey._id },
      { $set: { BirdName: updatedField } }
    );

    const photo = checklist.StartbirdingData[0].photo
    const userId = checklist.userId
    // Create a new notification document using the retrieved fields
    const newNotification = new NotificationModel({
      userId: userId,
      BirdName: updatedField,
      photoUrl: photo, // Assuming the updatedField holds the photo URL
    });

    // Save the new notification to the database
    await newNotification.save();
  } catch (error) {
    console.error(error);
  }
});
const port = 4001;
server.listen(port, () => {
  console.log(`App running on port ${port}..`);
});