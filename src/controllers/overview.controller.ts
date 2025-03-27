import { Request, Response } from "express";
import { IOverview } from "../interfaces/overview.interface";

let overviews: IOverview[] = [];

export const getAllOverviews = (req: Request, res: Response): void => {
  res.json(overviews);
};

export const createOverview = (req: Request, res: Response): void => {
  const { title, introduction, conclusion, researchFocus, imageGallery } = req.body;

  if (!title || !Array.isArray(introduction) || !Array.isArray(conclusion)) {
    res.status(400).json({ message: "Noto‘g‘ri ma'lumot formati!" });
    return;
  }

  const newOverview: IOverview = { title, introduction, conclusion, researchFocus, imageGallery };
  overviews.push(newOverview);

  res.status(201).json(newOverview);
};

export const getOverviewById = (req: Request, res: Response): void => {
  const index = parseInt(req.params.id);
  if (isNaN(index) || index < 0 || index >= overviews.length) {
    res.status(404).json({ message: "Overview topilmadi" });
    return;
  }
  res.json(overviews[index]);
};

export const updateOverview = (req: Request, res: Response): void => {
  const index = parseInt(req.params.id);
  if (isNaN(index) || index < 0 || index >= overviews.length) {
    res.status(404).json({ message: "Overview topilmadi" });
    return;
  }

  const { title, introduction, conclusion, researchFocus, imageGallery } = req.body;
  if (!title || !Array.isArray(introduction) || !Array.isArray(conclusion)) {
    res.status(400).json({ message: "Noto‘g‘ri ma'lumot formati!" });
    return;
  }

  overviews[index] = { title, introduction, conclusion, researchFocus, imageGallery };
  res.json(overviews[index]);
};

export const deleteOverview = (req: Request, res: Response): void => {
  const index = parseInt(req.params.id);
  if (isNaN(index) || index < 0 || index >= overviews.length) {
    res.status(404).json({ message: "Overview topilmadi" });
    return;
  }

  overviews.splice(index, 1);
  res.json({ message: "Overview o‘chirildi" });
};
