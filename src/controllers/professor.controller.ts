import { Request, Response } from "express";
import { Professor } from "../models/professor.model";

export const getAllProfessors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, fullName, university, researchAreas } = req.query;

    let filter: any = {};

    if (type) filter.type = type;
    if (fullName) filter.fullName = { $regex: fullName, $options: "i" }; 
    if (university) filter.university = { $regex: university, $options: "i" };
    if (researchAreas) filter.researchAreas = { $in: researchAreas.toString().split(",") };

    const professors = await Professor.find(filter);
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const createProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, type, position, department, university, researchAreas, contact, education, career, awards, imageUrl } = req.body;

    const newProfessor = new Professor({
      fullName,
      type,
      position,
      department,
      university,
      researchAreas: researchAreas || [],
      contact: contact || {},
      education: education || [],
      career: career || [],
      awards: awards || [],
      imageUrl,
    });

    await newProfessor.save();
    res.status(201).json(newProfessor);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const getProfessorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      res.status(404).json({ message: "Professor topilmadi" });
      return;
    }
    res.json(professor);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const updateProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProfessor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProfessor) {
      res.status(404).json({ message: "Professor topilmadi" });
      return;
    }

    res.json(updatedProfessor);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const deleteProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProfessor = await Professor.findByIdAndDelete(req.params.id);

    if (!deletedProfessor) {
      res.status(404).json({ message: "Professor topilmadi" });
      return;
    }

    res.json({ message: "Professor o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
