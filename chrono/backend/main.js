const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const authenticateToken = require("./middleware/authenticateToken");
const authorizeRole = require("./middleware/authorizeRole");




const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const batchRoutes = require("./routes/batchRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

//express APP ahahah easiest shit
const app = express();

app.use(cookieParser());

//for my middleware shit
app.use(cors());
app.use(express.json());



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);


//gotta connnect MONGODB too cuz idk shit about postgreSQL or whatever
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


//routes vagera banao band darwaazon ka kya faayda
app.use("/api/auth", authRoutes,authenticateToken);
app.use("/api/users", userRoutes,authenticateToken);
app.use("/api/classes", classRoutes,authenticateToken);
app.use("/api/batches", batchRoutes,authenticateToken);
app.use("/api/notifications", notificationRoutes,authenticateToken);


//should i even exist further atp?
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
