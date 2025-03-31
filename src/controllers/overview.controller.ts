import { Request, Response } from "express";
import { Overview } from "../models/overview.model";

// 🔹 1. Barcha Overview larni olish
export const getAllOverviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const overviews = await Overview.find();
    res.json(overviews);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 2. Yangi Overview qo'shish
export const createOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, introduction, conclusion, researchFocus, imageGallery } = req.body;

    const newOverview = new Overview({
      title,
      introduction: introduction || [], 
      conclusion: conclusion || [], 
      researchFocus: researchFocus || [], 
      imageGallery: imageGallery || [] 
    });

    await newOverview.save();
    res.status(201).json(newOverview);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 3. ID bo‘yicha bitta Overview ni olish
export const getOverviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const overview = await Overview.findById(req.params.id);
    if (!overview) {
      res.status(404).json({ message: "Overview topilmadi" });
      return;
    }
    res.json(overview);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 4. Overview ni yangilash
export const updateOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, introduction, conclusion, researchFocus, imageGallery } = req.body;

    const updatedOverview = await Overview.findByIdAndUpdate(
      req.params.id,
      {
        title,
        introduction,
        conclusion,
        researchFocus,
        imageGallery
      },
      { new: true }
    );

    if (!updatedOverview) {
      res.status(404).json({ message: "Overview topilmadi" });
      return;
    }

    res.json(updatedOverview);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 5. Overview ni o‘chirish
export const deleteOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedOverview = await Overview.findByIdAndDelete(req.params.id);
    
    if (!deletedOverview) {
      res.status(404).json({ message: "Overview topilmadi" });
      return;
    }

    res.json({ message: "Overview o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
