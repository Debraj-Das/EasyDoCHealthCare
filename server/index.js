import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./db.js";
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

// Calling the app method
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

import requireToken from "./middleware/requireToken.js";
import authRoute from "./routes/authRoutes.js";

app.use(authRoute);
app.get("/protected", requireToken, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});
