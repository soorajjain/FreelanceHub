import express from "express";
const app = express();
import dotenv from "dotenv";

import connectDB from "./src/helper/databaseConnection.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();

import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routing starts here

import projectRoutes from "./src/routes/projectRoute.js";
import authRoutes from "./src/routes/authRoute.js";
import jobRoute from "./src/routes/jobRoute.js";
import ratingRoute from "./src/routes/ratingRoute.js";
import applicationRoute from "./src/routes/applicationRoute.js";
import adminHandles from "./src/controller/admin/apiHandler.js";

app.use("/auth/users", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/job", jobRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/application", applicationRoute);
app.use("/api/admin", adminHandles);

// routing ends here

connectDB();
app.listen(PORT, () => {
  console.log("connected to port " + PORT);
});
