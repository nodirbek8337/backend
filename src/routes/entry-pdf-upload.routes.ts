import express from 'express';
import multer from 'multer';
import {
  uploadEntryPdf,
  getEntryPdf,
  deleteEntryPdf,
} from '../controllers/entry-pdf-upload.controller';

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('pdf'), uploadEntryPdf);
router.get('/:entryId', getEntryPdf);
router.delete('/:entryId', deleteEntryPdf);

export default router;