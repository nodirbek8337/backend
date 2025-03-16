import mongoose, { Schema, Document } from "mongoose";

export interface IProfessor extends Document {
  fullName: string;
  type: "regular" | "industrial" | "collaboration" | "visiting";
  position: string;
  department?: string;
  university?: string;
  researchAreas?: string[];
  officeLocation?: string;
  address?: string;
  email: string;
  officePhone?: string;
  officeFax?: string;
  cellPhone?: string;
  imageUrl: string;
  experience?: {
    period: string;
    position: string;
    company: string;
  }[];
  bio?: string;
  contact?: {
    period: string;
    website?: string;
    email: string;
  };
}

const ProfessorSchema: Schema = new Schema({
  fullName: { type: String, required: false },
  type: { type: String, enum: ["regular", "industrial", "collaboration", "visiting"], required: false },
  position: { type: String, required: false },
  department: { type: String, required: false },
  university: { type: String, required: false },
  researchAreas: [{ type: String, required: false }],
  officeLocation: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: false },
  officePhone: { type: String, required: false },
  officeFax: { type: String, required: false },
  cellPhone: { type: String, required: false },
  imageUrl: { type: String, required: false },
  experience: [
    {
      period: { type: String, required: false },
      position: { type: String, required: false },
      company: { type: String, required: false },
    },
  ],
  bio: { type: String, required: false },
  contact: {
    period: { type: String, required: false },
    website: { type: String, required: false },
    email: { type: String, required: false },
  },
});

export const Professor = mongoose.model<IProfessor>("Professor", ProfessorSchema);
