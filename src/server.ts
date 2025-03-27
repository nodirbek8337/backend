import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import overviewRoutes from "./routes/overview.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/overviews", overviewRoutes);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: ${process.env.RENDER_EXTERNAL_HOSTNAME || "localhost"}:${PORT}`);
});
