import express from 'express';
import {
  createSection,
  updateSection,
  getAllSections,
  deleteSection
} from '../controllers/section.controller';

const router = express.Router();

router.get('/', getAllSections);
router.post('/', createSection);
router.put('/:id', updateSection);
router.delete('/:id', deleteSection);

export default router;