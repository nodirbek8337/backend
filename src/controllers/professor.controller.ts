import { Request, Response } from "express";
import { Professor } from "../models/professor.model";

// 🔹 1. Barcha professorlarni olish + Filtering
export const getAllProfessors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, fullName, university, researchAreas } = req.query;

    let filter: any = {};

    if (type) {
      filter.type = type;
    }

    if (fullName) {
      filter.fullName = { $regex: fullName, $options: "i" }; // Case-insensitive search
    }

    if (university) {
      filter.university = { $regex: university, $options: "i" };
    }

    if (researchAreas) {
      filter.researchAreas = { $in: researchAreas.toString().split(",") }; // Multiple research areas
    }

    const professors = await Professor.find(filter);
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 2. Yangi professor qo'shish
export const createProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, type, position, department, university, researchAreas, officeLocation, address, email, officePhone, officeFax, cellPhone, imageUrl, experience, bio, contact } = req.body;

    const newProfessor = new Professor({
      fullName,
      type,
      position,
      department,
      university,
      researchAreas: researchAreas || [],
      officeLocation,
      address,
      email,
      officePhone,
      officeFax,
      cellPhone,
      imageUrl,
      experience,
      bio,
      contact
    });

    await newProfessor.save();
    res.status(201).json(newProfessor);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 3. ID bo‘yicha professorni olish
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

// 🔹 4. Professorni yangilash
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

// 🔹 5. Professorni o‘chirish
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
