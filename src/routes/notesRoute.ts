import express from 'express';
import {
  validateNote,
  validateParamId,
  validateUpdateNote,
} from '../middleware/validations';
import { idSchema, noteSchema, updateNoteSchema } from '../schema/noteSchema';
import notesService from '../services/notesService';

const router: express.Router = express.Router();

router.get('/notes', notesService.getAll);
router.get('/notes/:id', notesService.findOne);
router.get('/stats', notesService.getStats);
router.post('/notes', validateNote(noteSchema), notesService.create);
router.patch(
  '/notes/:id',
  validateUpdateNote(updateNoteSchema, idSchema),
  notesService.update
);
router.delete('/notes/:id', validateParamId(idSchema), notesService.delete);

export default router;
