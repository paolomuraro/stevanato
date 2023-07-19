import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import login from "./routes/login.js";
import upload from "./routes/upload.js";
import search from "./routes/search.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/login", login);
app.use("/api/upload", upload);
app.use("/api/search", search);

const startSever = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(8080, () => console.log("Server running on port 8080"));
    } catch (error) {
        console.log(error);
    }
};

startSever();
