import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import overviewRoutes from "./routes/overview.routes";
import memberRoutes from "./routes/member.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/overviews", overviewRoutes);
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: ${process.env.RENDER_EXTERNAL_HOSTNAME || "localhost"}:${PORT}`);
});
