import { Request, Response } from "express";
import { Thesis } from "../models/thesis.model";

export const getAllTheses = async (req: Request, res: Response) => {
  const theses = await Thesis.find();
  res.json(theses);
};

export const getThesisById = async (req: Request, res: Response) => {
  const thesis = await Thesis.findById(req.params.id);
  res.json(thesis);
};

export const createThesis = async (req: Request, res: Response) => {
  const newThesis = new Thesis(req.body);
  await newThesis.save();
  res.status(201).json(newThesis);
};

export const updateThesis = async (req: Request, res: Response) => {
  const updatedThesis = await Thesis.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedThesis);
};

export const deleteThesis = async (req: Request, res: Response) => {
  await Thesis.findByIdAndDelete(req.params.id);
  res.json({ message: "Thesis deleted" });
};