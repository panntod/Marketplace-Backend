import express from "express";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express();
const port = process.env.APP_PORT;
const nameApp = process.env.APP_NAME
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

import main from "./routes/main"

app.use(main)

app.listen(port, () => {
  console.log(`${nameApp} is running on port ${port}`);
});
