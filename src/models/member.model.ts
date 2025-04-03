import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  fullName: string;
  nationality: string;
  researchGroup: string;
  year: number;
  major: string;
  email: string;
  imageUrl: string;
  academicStatus: "alumni" | "undergraduate" | "master-candidate" | "phd-candidate" | "post-doc";
}

const MemberSchema: Schema = new Schema({
  fullName: { type: String, required: false },
  nationality: { type: String, required: false },
  researchGroup: { type: String, required: false },
  year: { type: Number, required: false },
  major: { type: String, required: false },
  email: { type: String, required: false },
  imageUrl: { type: String, required: false },
  academicStatus: { type: String, enum: ["alumni", "undergraduate", "master-candidate", "phd-candidate", "post-doc"], required: false },
});

export const Member = mongoose.model<IMember>("Member", MemberSchema);
