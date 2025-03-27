import { Request, Response } from "express";
import { IMember } from "../interfaces/member.interface";

let members: IMember[] = [];

export const getAllMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    let filteredMembers = members;

    const { nationality, year, major, academicStatus } = req.query;

    if (nationality) {
      filteredMembers = filteredMembers.filter(member =>
        member.nationality.toLowerCase().includes(String(nationality).toLowerCase())
      );
    }

    if (year) {
      filteredMembers = filteredMembers.filter(member => member.year === Number(year));
    }

    if (major) {
      filteredMembers = filteredMembers.filter(member =>
        member.major.toLowerCase().includes(String(major).toLowerCase())
      );
    }

    if (academicStatus) {
      filteredMembers = filteredMembers.filter(member => member.academicStatus === academicStatus);
    }

    res.json(filteredMembers);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const createMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, nationality, year, major, email, imageUrl, academicStatus } = req.body;

    if (!fullName || !nationality || !year || !major || !email || !imageUrl || !academicStatus) {
      res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi shart!" });
      return;
    }

    const newMember: IMember = {
      id: String(Date.now()),
      fullName,
      nationality,
      year,
      major,
      email,
      imageUrl,
      academicStatus,
    };

    members.push(newMember);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = members.find(m => m.id === req.params.id);
    if (!member) {
      res.status(404).json({ message: "Member topilmadi" });
      return;
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const updateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const index = members.findIndex(m => m.id === req.params.id);

    if (index === -1) {
      res.status(404).json({ message: "Member topilmadi" });
      return;
    }

    members[index] = { ...members[index], ...req.body };
    res.json(members[index]);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const index = members.findIndex(m => m.id === req.params.id);

    if (index === -1) {
      res.status(404).json({ message: "Member topilmadi" });
      return;
    }

    members.splice(index, 1);
    res.json({ message: "Member o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
