import notesData from '../data/data';
import { findDates, getFullDate } from '../helpers/helpers';
import Note from '../types/Note';

const notes: { notesData: Note[] } = { notesData };

const notesListSlice = {
  createNewNote: (note: Note) => {
    const id = +new Date();
    const creationDate = getFullDate();
    const dates = findDates(note.content) || '';
    const active = true;
    const newNote = { ...note, creationDate, dates, id, active };

    notes.notesData = [...notes.notesData, newNote];
    return note;
  },
  updateNote: (updateNote: Note) => {
    const { name, id, content, category } = updateNote;
    const dates = findDates(content);
    notes.notesData = notes.notesData.map((note) => {
      if (note.id === id) {
        return { ...note, name, content, category, dates };
      } else {
        return note;
      }
    });
    return updateNote;
  },
  archiveNote: () => {
    state.notesList = state.notesList.map((note) => {
      if (note.id === action.payload) {
        return { ...note, active: true };
      } else {
        return note;
      }
    });
  },
  activateNote: (state, action: PayloadAction<number>) => {
    state.notesList = state.notesList.map((note) => {
      if (note.id === action.payload) {
        return { ...note, active: false };
      } else {
        return note;
      }
    });
  },
  deleteNote: (state, action: PayloadAction<number>) => {
    state.notesList = state.notesList.filter(
      (note) => note.id !== +action.payload
    );
  },
  changeEditNoteId: (state, action: PayloadAction<number>) => {
    state.updateNoteId = action.payload;
  },
  toogleForm: (state, action: PayloadAction<boolean>) => {
    state.showForm = action.payload;
  },
  isUpdating: (state, action: PayloadAction<boolean>) => {
    state.isUpdated = action.payload;
  },
};
