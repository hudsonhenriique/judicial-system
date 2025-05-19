import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import processRoutes from "./routes/processRoutes.js";
import proceedingsRoutes from "./routes/proceedingsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use("/processes", processRoutes);
app.use("/proceedings", proceedingsRoutes);

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

export default app;
