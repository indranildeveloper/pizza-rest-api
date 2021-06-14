import express from "express";
import mongoose from "mongoose";
import path from "path";
import routes from "./routes";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Database Connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DB connected ...");
});

global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Server running on ${APP_PORT}`));
