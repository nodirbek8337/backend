import mongoose from "mongoose";

const ThesisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  thesisFile: { type: String, required: true },
  presentationFile: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const Thesis = mongoose.model("Thesis", ThesisSchema);