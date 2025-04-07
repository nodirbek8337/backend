import { Request, Response } from "express";
import { ProfessorImageUpload } from "../models/professor-image-upload.model";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const CHUNK_SIZE = 256 * 1024; // 256KB

export const uploadProfessorImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Fayl topilmadi" });
      return;
    }

    const { professorId } = req.body;
    const fileBuffer = req.file.buffer;

    if (fileBuffer.length > MAX_FILE_SIZE) {
      res.status(400).json({ message: "Fayl hajmi 2MB dan oshmasligi kerak" });
      return;
    }

    await ProfessorImageUpload.deleteMany({ professorId });

    const totalChunks = Math.ceil(fileBuffer.length / CHUNK_SIZE);
    for (let i = 0; i < totalChunks; i++) {
      const chunk = fileBuffer.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      await new ProfessorImageUpload({
        professorId,
        chunkIndex: i,
        data: chunk,
      }).save();
    }

    res.status(201).json({ message: "Rasm muvaffaqiyatli yuklandi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const getProfessorImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { professorId } = req.params;
    const chunks = await ProfessorImageUpload.find({ professorId }).sort("chunkIndex");

    if (!chunks.length) {
      res.status(404).json({ message: "Rasm topilmadi" });
      return;
    }

    const fullImage = Buffer.concat(chunks.map(chunk => chunk.data));
    res.contentType("image/jpeg"); // png bo‘lsa "image/png" qil
    res.send(fullImage);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
