import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import overviewRoutes from "./routes/overview.routes";
import contactRoutes from "./routes/contact.routes";
import professorRoutes from "./routes/professor.routes";
import memberRoutes from "./routes/member.routes";
import thesisRoutes from "./routes/thesis.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/overviews", overviewRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/professors", professorRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/theses", thesisRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: ${process.env.RENDER_EXTERNAL_HOSTNAME || "localhost"}:${PORT}`);
});
