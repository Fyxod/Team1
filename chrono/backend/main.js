const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const attendanceRoutes = require("./routes/attendanceRoutes");
const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const batchRoutes = require("./routes/batchRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


// const itemRoutes = require("./routes/itemRoutes");


//express APP ahahah easiest shit
const app = express();



//for my middleware shit
app.use(cors());
app.use(express.json());


//gotta connnect MONGODB too cuz idk shit about postgreSQL or whatever
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


//routes vagera banao band darwaazon ka kya faayda
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/notifications", notificationRoutes);
// app.use("/api/items", itemRoutes);



//should i even exist further atp?
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
