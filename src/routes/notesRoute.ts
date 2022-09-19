import express from "express";
import { validateNote } from "../middleware/validations";
import { noteSchema } from "../schema/noteSchema";
import notesService from "../services/notesService";

const router: express.Router = express.Router();

router.get("/notes", notesService.getAll);
router.get("/notes/:id", notesService.findOne);
router.get("/stats", notesService.getStats);
router.post("/notes", validateNote(noteSchema), notesService.create);
router.patch("/notes/:id", notesService.update);
router.delete("/notes/:id", notesService.delete);

export default router;
