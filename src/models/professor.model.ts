import mongoose, { Schema, Document } from "mongoose";

export interface IProfessor extends Document {
  fullName: string;
  type: "regular" | "industrial" | "collaboration" | "visiting";
  position: string;
  department: string;
  university: string;
  researchAreas: string[];
  contact: {
    address: string;
    email: string;
    officePhone?: string;
    officeFax?: string;
    cellPhone?: string;
  };
  education: {
    year: string;
    university: string;
    major: string;
    degree: string;
  }[];
  career: {
    year: string;
    position: string;
    university: string;
  }[];
  awards: {
    year: string;
    title: string;
  }[];
  imageUrl: string;
}

const ProfessorSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  type: { type: String, enum: ["regular", "industrial", "collaboration", "visiting"], required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  university: { type: String, required: true },
  researchAreas: [{ type: String, required: true }],
  contact: {
    address: { type: String, required: true },
    email: { type: String, required: true },
    officePhone: { type: String, required: false },
    officeFax: { type: String, required: false },
    cellPhone: { type: String, required: false },
  },
  education: [
    {
      year: { type: String, required: true },
      university: { type: String, required: true },
      major: { type: String, required: true },
      degree: { type: String, required: true },
    },
  ],
  career: [
    {
      year: { type: String, required: true },
      position: { type: String, required: true },
      university: { type: String, required: true },
    },
  ],
  awards: [
    {
      year: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  imageUrl: { type: String, required: false },
});

export const Professor = mongoose.model<IProfessor>("Professor", ProfessorSchema);
