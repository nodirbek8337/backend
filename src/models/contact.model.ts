import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  position: string;
  officeHour: string;
  officeLocation: string;
  address: string;
  email: string;
  phone: string;
  fax: string;
  imageUrl: string;
}

const ContactSchema: Schema = new Schema({
  fullName: { type: String, required: true }, 
  position: { type: String, required: true }, 
  officeHour: { type: String, required: true }, 
  officeLocation: { type: String, required: true },
  address: { type: String, required: true }, 
  email: { type: String, required: true },
  phone: { type: String, required: true },
  fax: { type: String, required: true }, 
  imageUrl: { type: String, required: true } 
});

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
