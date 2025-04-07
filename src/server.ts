import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from "./config/database.config";
import mongoose from "mongoose";
import overviewRoutes from "./routes/overview.routes";
import contactRoutes from "./routes/contact.routes";
import professorRoutes from "./routes/professor.routes";
import memberRoutes from "./routes/member.routes";
import professorImageRoutes from "./routes/professor-image-upload.routes";

const app = express();
app.use(express.json());
app.use(cors());

dbConnect();

app.use("/api/overviews", overviewRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/professors", professorRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/professor-image-upload", professorImageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`);
});
