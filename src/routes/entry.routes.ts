import express from 'express';
import multer from 'multer';
import {
  createEntry,
  updateEntry,
  deleteEntry,
  getEntries,
  uploadPdf
} from '../controllers/entry.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/entries/' });

router.get('/', getEntries);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);
router.post('/:id/upload', upload.single('pdf'), uploadPdf);

export default router;