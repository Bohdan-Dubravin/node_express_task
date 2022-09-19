import notes from '../data/data';
import { findDates, getFullDate, getSummaryes } from '../helpers/helpers';
import NewNote from '../types/NewNote';
import Note from '../types/Note';
import UpdateNote from '../types/UpdateNote';

const notesList: { notes: Note[] } = { notes };

const notesRepository = {
  getAllNotes: () => {
    return notesList.notes;
  },
  getOneNote: (id: string) => {
    const note = notesList.notes.find((note) => note.id === +id);

    if (!note) {
      throw new Error('Note not found');
    }

    return note;
  },
  createNewNote: (note: NewNote) => {
    const id = +new Date();
    const creationDate = getFullDate();
    const dates = findDates(note.content) || '';
    const active = true;
    const newNote = { ...note, creationDate, dates, id, active };

    notesList.notes = [...notesList.notes, newNote];
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
  deleteNote: (id: string) => {
    const removedNote = notesList.notes.find((note) => note.id === +id);

    if (!removedNote) {
      throw new Error('Note not found');
    }

    notesList.notes = notesList.notes.filter((note) => note.id !== +id);
    return removedNote;
  },
  getSummary: () => {
    const summary = getSummaryes(notesList.notes);
    return summary;
  },
};

export default notesRepository;
