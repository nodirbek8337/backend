import mongoose, { Schema, Document } from 'mongoose';

export interface IEntryPdf extends Document {
  entryId: string;
  chunkIndex: number;
  data: Buffer;
  mimetype: string;
}

const EntryPdfSchema = new Schema<IEntryPdf>({
  entryId: { type: String, required: true },
  chunkIndex: { type: Number, required: true },
  data: { type: Buffer, required: true },
  mimetype: { type: String, required: false },
});

export const EntryPdf = mongoose.model<IEntryPdf>('EntryPdf', EntryPdfSchema);