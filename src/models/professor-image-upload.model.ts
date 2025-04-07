import mongoose, { Schema, Document } from "mongoose";

export interface IProfessorImageUpload extends Document {
  professorId: string;
  chunkIndex: number;
  data: Buffer;
  mimetype: string;
}

const ProfessorImageUploadSchema: Schema = new Schema({
  professorId: { type: String, required: true },
  chunkIndex: { type: Number, required: true },
  data: { type: Buffer, required: true },
  mimetype: { type: String, required: false },
});

export const ProfessorImageUpload = mongoose.model<IProfessorImageUpload>(
  "ProfessorImageUpload",
  ProfessorImageUploadSchema
);
