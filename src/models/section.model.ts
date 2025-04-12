import mongoose, { Schema, Document } from "mongoose";

export interface ISection extends Document {
  year: number;
  title: string; 
}

const SectionSchema = new Schema<ISection>({
  year: { type: Number, required: true },
  title: { type: String, required: true }
});

export const Section = mongoose.model<ISection>("Section", SectionSchema);
