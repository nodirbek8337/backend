import mongoose, { Schema, Document } from "mongoose";

export interface IOverview extends Document {
  title?: string; 
  introduction?: string[]; 
  conclusion?: string[]; 
  researchFocus?: {
    category?: string; 
    details?: string[]; 
  }[];
  imageGallery?: string[];
}

const OverviewSchema: Schema = new Schema({
  title: { type: String, default: null }, 
  introduction: [{ type: String, default: null }], 
  conclusion: [{ type: String, default: null }], 
  researchFocus: [
    {
      category: { type: String, default: null }, 
      details: [{ type: String, default: null }], 
    },
  ],
  imageGallery: [{ type: String, default: null }]
});

export const Overview = mongoose.model<IOverview>("Overview", OverviewSchema);
