import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  fullName: string;
  nationality: string;
  year: number;
  major: string;
  email: string;
  imageUrl: string;
  academicStatus: "alumni" | "undergraduate" | "master-candidate" | "phd-candidate" | "post-doc";
}

const MemberSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  nationality: { type: String, required: true },
  year: { type: Number, required: true },
  major: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  academicStatus: { type: String, enum: ["alumni", "undergraduate", "master-candidate", "phd-candidate", "post-doc"], required: true },
});

export const Member = mongoose.model<IMember>("Member", MemberSchema);
