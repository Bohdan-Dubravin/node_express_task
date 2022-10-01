import notes from '../data/data';
import { findDates, getFullDate, getSummaries } from '../helpers/helpers';
import NewNote from '../types/NewNote';
import Note from '../types/Note';
import UpdateNote from '../types/UpdateNote';
import pool from '../db';

const notesList: { notes: Note[] } = { notes };

const notesRepository = {
  getAllNotes: async () => {
    const note = await pool.query('SELECT * FROM note');

    if (!note.rowCount) {
      throw new Error('Notes not found');
    }

    return note.rows;
  },
  getOneNote: async (id: string) => {
    const note = await pool.query('SELECT * FROM note WHERE id = $1', [id]);
    if (!note.rowCount) {
      throw new Error('Note not found');
    }

    return note.rows[0];
  },
  createNewNote: async (note: NewNote) => {
    const created_at = getFullDate();
    const dates = findDates(note.content) || '';
    const active = true;
    const { name, category, content } = note;

    const newNote = await pool.query(
      'INSERT INTO note (name, category, content, created_at, dates, active) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, category, content, created_at, dates, active]
    );

    return newNote;
  },
  updateNote: (oldNote: UpdateNote, noteId: string) => {
    const findNote = notesList.notes.find((item) => item.id === +noteId);
    if (!findNote) {
      throw new Error('Note not found');
    }

    const dates = findDates(oldNote.content);
    const updatedNote = { ...findNote, ...oldNote, dates };

    notesList.notes = notesList.notes.map((note) => {
      if (note.id === +noteId) {
        return updatedNote;
      } else {
        return note;
      }
    });
    return updatedNote;
  },
  changeNoteStatus: (id: number) => {
    const findNote = notesList.notes.find((item) => item.id === id);
    if (!findNote) {
      throw new Error('Note not found');
    }

    notesList.notes = notesList.notes.map((note) => {
      if (note.id === id) {
        return { ...note, active: !note.active };
      } else {
        return note;
      }
    });
  },
  deleteNote: async (id: string) => {
    const removedNote = await pool.query('DELETE FROM note WHERE id = $1', [
      id,
    ]);

    if (!removedNote.rowCount) {
      throw new Error('Note not found');
    }

    return removedNote;
  },
  getSummary: () => {
    const summary = getSummaries(notesList.notes);
    return summary;
  },
};

export default notesRepository;
