import mongoose, { Schema, Document } from 'mongoose';

export interface IEntry extends Document {
  sectionId: mongoose.Types.ObjectId;
  code: string;
  title: string;
  authors: string;
  source: string;
  pdfUrl?: string;
  createdAt: Date;
}

const EntrySchema = new Schema<IEntry>({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: String, required: true },
  source: { type: String, required: true },
  pdfUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Entry = mongoose.model<IEntry>('Entry', EntrySchema);