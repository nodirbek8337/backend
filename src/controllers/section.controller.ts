import { Request, Response } from 'express';
import { Section } from '../models/section.model';

export const getAllSections = async (req: Request, res: Response) => {
  const sections = await Section.find().sort({ year: -1 });
  res.json(sections);
};

export const createSection = async (req: Request, res: Response) => {
  const { title, year } = req.body;
  const section = new Section({ title, year });
  await section.save();
  res.status(201).json(section);
};

export const updateSection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, year } = req.body;
  const section = await Section.findByIdAndUpdate(id, { title, year }, { new: true });
  res.json(section);
};

export const deleteSection = async (req: Request, res: Response) => {
  await Section.findByIdAndDelete(req.params.id);
  res.json({ message: 'Section deleted' });
};