import { Request, Response } from "express";
import { Member } from "../models/member.model";

// 🔹 1. Barcha a'zolarni olish + Filtering
export const getAllMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nationality, researchGroup, year, major, academicStatus } = req.query;

    let filter: any = {};

    if (nationality) {
      filter.nationality = { $regex: nationality, $options: "i" };
    }

    if (researchGroup) {
      filter.researchGroup = { $regex: researchGroup, $options: "i" }; 
    }

    if (year) {
      filter.year = Number(year);
    }

    if (major) {
      filter.major = { $regex: major, $options: "i" };
    }

    if (academicStatus) {
      filter.academicStatus = academicStatus;
    }

    const members = await Member.find(filter);
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 2. Yangi a'zo qo'shish
export const createMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, nationality, researchGroup, year, major, email, imageUrl, academicStatus } = req.body;

    const newMember = new Member({
      fullName,
      nationality,
      researchGroup,
      year,
      major,
      email,
      imageUrl,
      academicStatus,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 3. ID bo‘yicha a'zoni olish
export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      res.status(404).json({ message: "Member topilmadi" });
      return;
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 4. A'zoni yangilash
export const updateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedMember) {
      res.status(404).json({ message: "Member topilmadi" });
      return;
    }

    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 5. A'zoni o‘chirish
export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      res.status(404).json({ message: "Member topilmadi" });
      return;
    }

    res.json({ message: "Member o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
