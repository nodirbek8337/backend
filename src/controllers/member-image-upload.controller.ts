import { Request, Response } from "express";
import { MemberImageUpload } from "../models/member-image-upload.model";
import { Member } from "../models/member.model";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const CHUNK_SIZE = 256 * 1024;

export const uploadMemberImage = async (req: Request, res: Response): Promise<void> => {
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

    const { memberId } = req.body;
    const fileBuffer = req.file.buffer;

    if (fileBuffer.length > MAX_FILE_SIZE) {
      res.status(400).json({ message: "Fayl hajmi 2MB dan oshmasligi kerak" });
      return;
    }

    await MemberImageUpload.deleteMany({ memberId });

    const totalChunks = Math.ceil(fileBuffer.length / CHUNK_SIZE);
    for (let i = 0; i < totalChunks; i++) {
      const chunk = fileBuffer.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      await new MemberImageUpload({
        memberId,
        chunkIndex: i,
        data: chunk,
        mimetype: i === 0 ? req.file.mimetype : undefined,
      }).save();
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/api/member-image-upload/${memberId}`;
    await Member.findByIdAndUpdate(memberId, { imageUrl });

    res.status(201).json({ message: "Rasm muvaffaqiyatli yuklandi va a’zoga bog‘landi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

export const getMemberImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId } = req.params;
    const chunks = await MemberImageUpload.find({ memberId }).sort("chunkIndex");

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

export const deleteMemberImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId } = req.params;
    await MemberImageUpload.deleteMany({ memberId });
    res.json({ message: "Rasm o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
