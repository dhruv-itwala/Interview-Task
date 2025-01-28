import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import hrRoute from "./routes/hrRoute.js";
import tsRoute from "./routes/tsRoute.js";

// app configurations
const app = express();
const PORT = process.env.PORT || 4000;

// database
connectDB();
// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

//API Callings
app.use("/api/hr", hrRoute);
app.use("/api/ts", tsRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
