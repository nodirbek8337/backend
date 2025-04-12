import { Request, Response } from 'express';
import { Entry } from '../models/entry.model';

export const getEntries = async (req: Request, res: Response) => {
  const filter: any = {};
  if (req.query.sectionId) filter.sectionId = req.query.sectionId;
  const entries = await Entry.find(filter).sort({ createdAt: -1 });
  res.json(entries);
};

export const createEntry = async (req: Request, res: Response) => {
  const { sectionId, code, title, authors, source } = req.body;
  const entry = new Entry({ sectionId, code, title, authors, source });
  await entry.save();
  res.status(201).json(entry);
};

export const updateEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sectionId, code, title, authors, source } = req.body;
  const entry = await Entry.findByIdAndUpdate(
    id,
    { sectionId, code, title, authors, source },
    { new: true }
  );
  res.json(entry);
};

export const deleteEntry = async (req: Request, res: Response) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Entry deleted' });
};

export const uploadPdf = async (req: Request, res: Response) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry || !req.file) {
    res.status(404).json({ message: 'Entry or file not found' });
    return;
  }
  entry.pdfUrl = `/uploads/entries/${req.file.filename}`;
  await entry.save();
  res.json({ message: 'PDF uploaded', url: entry.pdfUrl });
};
