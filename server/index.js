import express from "express";
const app = express();
import dotenv from "dotenv";
import routes from "./routes.js";
import connectDB from "./src/helper/databaseConnection.js";
import cors from "cors";
import userRoutes from "./src/routes/userRoute.js";
import projectRoutes from "./src/routes/projectRoute.js";
import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

connectDB();
app.listen(PORT, () => {
  console.log("connected to port " + PORT);
});
