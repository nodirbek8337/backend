import { Request, Response } from "express";
import { ProfessorImageUpload } from "../models/professor-image-upload.model";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const CHUNK_SIZE = 256 * 1024; 

export const uploadProfessorImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Fayl topilmadi" });
      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).json({ message: "Faqat JPG, JPEG yoki PNG ruxsat etiladi" });
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
        mimetype: i === 0 ? req.file.mimetype : undefined, 
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
    const mimeType = chunks[0].mimetype || "image/jpeg";

    res.contentType(mimeType);
    res.send(fullImage);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const deleteProfessorImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { professorId } = req.params;
    await ProfessorImageUpload.deleteMany({ professorId });
    res.json({ message: "Rasm o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

