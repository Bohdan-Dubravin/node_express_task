import express from 'express';
import notesRepository from '../repositories/notesRepositories';

const notesService = {
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const notes = await notesRepository.getAllNotes();

      res.json(notes);
    } catch (error) {
      const { message } = error as Error;

      res.status(500).json(message);
    }
  },
  findOne: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      const todo = await notesRepository.getOneNote(id);
      res.json(todo);
    } catch (error) {
      const { message } = error as Error;

      return res.status(404).json(message);
    }
  },
  create: async (req: express.Request, res: express.Response) => {
    try {
      const note = await notesRepository.createNewNote(req.body);
      return res.json(note.rows[0]);
    } catch (error) {
      const { message } = error as Error;
      return res.status(500).json(message);
    }
  },
  update: async (req: express.Request, res: express.Response) => {
    const params: string = req.params.id;
    console.log(params);

    try {
      const note = await notesRepository.updateNote(req.body, params);
      return res.json(note);
    } catch (error) {
      const { message } = error as Error;
      return res.status(404).json(message);
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    const params: string = req.params.id;
    try {
      const note = await notesRepository.deleteNote(params);
      return res.json(note);
    } catch (error) {
      const { message } = error as Error;
      return res.status(404).json(message);
    }
  },
  getStats: async (req: express.Request, res: express.Response) => {
    try {
      const summary = await notesRepository.getSummary();
      return res.json(summary);
    } catch (error) {
      const { message } = error as Error;
      return res.status(500).json(message);
    }
  },
};

export default notesService;
