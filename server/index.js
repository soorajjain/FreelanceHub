import express from "express";
const app = express();
import dotenv from "dotenv";
import routes from "./routes.js";
import connectDB from "./src/helper/databaseConnection.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
connectDB();

app.listen(PORT, () => {
  console.log("connected to port " + PORT);
});
