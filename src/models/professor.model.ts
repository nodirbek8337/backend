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
    period?: string;
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
  fullName: { type: String, required: false },
  type: { type: String, enum: ["regular", "industrial", "collaboration", "visiting"], required: false },
  position: { type: String, required: false },
  department: { type: String, required: false },
  university: { type: String, required: false },
  researchAreas: [{ type: String, required: false }],
  contact: {
    address: { type: String, required: false },
    email: { type: String, required: false },
    officePhone: { type: String, required: false },
    officeFax: { type: String, required: false },
    cellPhone: { type: String, required: false },
    period: { type: String, required: false },
  },
  education: [
    {
      year: { type: String, required: false },
      university: { type: String, required: false },
      major: { type: String, required: false },
      degree: { type: String, required: false },
    },
  ],
  career: [
    {
      year: { type: String, required: false },
      position: { type: String, required: false },
      university: { type: String, required: false },
    },
  ],
  awards: [
    {
      year: { type: String, required: false },
      title: { type: String, required: false },
    },
  ],
  imageUrl: { type: String, required: false },
});

export const Professor = mongoose.model<IProfessor>("Professor", ProfessorSchema);
