import { Request, Response } from 'express';
import { EntryPdf } from '../models/entry-pdf.model';
import { Entry } from '../models/entry.model';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const CHUNK_SIZE = 256 * 1024; // 256KB

export const uploadEntryPdf = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Fayl topilmadi' });
      return;
    }

    if (req.file.mimetype !== 'application/pdf') {
      res.status(400).json({ message: 'Faqat PDF ruxsat etiladi' });
      return;
    }

    const { entryId } = req.body;
    const fileBuffer = req.file.buffer;

    if (fileBuffer.length > MAX_FILE_SIZE) {
      res.status(400).json({ message: 'Fayl hajmi 4MB dan oshmasligi kerak' });
      return;
    }

    await EntryPdf.deleteMany({ entryId });

    const totalChunks = Math.ceil(fileBuffer.length / CHUNK_SIZE);
    for (let i = 0; i < totalChunks; i++) {
      const chunk = fileBuffer.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      await new EntryPdf({
        entryId,
        chunkIndex: i,
        data: chunk,
        mimetype: i === 0 ? req.file.mimetype : undefined,
      }).save();
    }

    const pdfUrl = `${req.protocol}://${req.get('host')}/api/entry-pdf-upload/${entryId}`;
    await Entry.findByIdAndUpdate(entryId, { pdfUrl });

    res.status(201).json({ message: 'PDF muvaffaqiyatli yuklandi', url: pdfUrl });
  } catch (error) {
    res.status(500).json({ message: 'Serverda xatolik', error });
  }
};

export const getEntryPdf = async (req: Request, res: Response): Promise<void> => {
  try {
    const { entryId } = req.params;
    const chunks = await EntryPdf.find({ entryId }).sort('chunkIndex');

    if (!chunks.length) {
      res.status(404).json({ message: 'PDF topilmadi' });
      return;
    }

    const fullPdf = Buffer.concat(chunks.map(chunk => chunk.data));
    const mimeType = chunks[0].mimetype || 'application/pdf';

    res.contentType(mimeType);
    res.send(fullPdf);
  } catch (error) {
    res.status(500).json({ message: 'Serverda xatolik', error });
  }
};

export const deleteEntryPdf = async (req: Request, res: Response): Promise<void> => {
  try {
    const { entryId } = req.params;
    await EntryPdf.deleteMany({ entryId });
    res.json({ message: 'PDF o‘chirildi' });
  } catch (error) {
    res.status(500).json({ message: 'Serverda xatolik', error });
  }
};