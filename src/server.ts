import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import overviewRoutes from "./routes/overview.routes";
import contactRoutes from "./routes/contact.routes";
import professorRoutes from "./routes/professor.routes";
import memberRoutes from "./routes/member.routes";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB ulanishi muvaffaqiyatli"))
  .catch((err) => console.log("❌ MongoDB ulanishida xatolik:", err));

app.use("/api/overviews", overviewRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/professors", professorRoutes);
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`);
});
