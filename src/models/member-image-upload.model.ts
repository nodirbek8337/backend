import mongoose, { Schema, Document } from "mongoose";

export interface IMemberImageUpload extends Document {
  memberId: string;
  chunkIndex: number;
  data: Buffer;
  mimetype: string;
}

const MemberImageUploadSchema: Schema = new Schema({
  memberId: { type: String, required: true },
  chunkIndex: { type: Number, required: true },
  data: { type: Buffer, required: true },
  mimetype: { type: String, required: false },
});

export const MemberImageUpload = mongoose.model<IMemberImageUpload>(
  "MemberImageUpload",
  MemberImageUploadSchema
);
