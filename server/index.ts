import express from "express";
import { urlencoded, json } from "body-parser";
import apiRouter from "./routes/api";
import connectDB from "./connection";
import dbutil from "./controllers/mailer";

import cors from "cors";
const port = 8000;
const app = express();
app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(json());

connectDB("mongodb://localhost:27017/schedula");

dbutil();

app.use("/api", apiRouter);
app.listen(port, () => console.log(`started`));
