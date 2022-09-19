import * as yup from "yup";

const noteSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is empty")
    .min(5, "Min length 5")
    .max(40, "Max length 40"),
  content: yup
    .string()
    .required("Content is empty")
    .min(10, "Min length 10")
    .max(200, "Max length 200"),
  category: yup
    .string()
    .required("Category is not chosen")
    .oneOf(
      ["Idea", "Task", "Random Thought"],
      "The category must be: ['Idea', 'Task', 'Random Thought']"
    ),
});

const updateNoteSchema = noteSchema.shape({
  active: yup.boolean().required("You must add note status"),
});

const idSchema = yup.object().shape({
  id: yup.string().required("You must pass an id"),
});

export { noteSchema, idSchema, updateNoteSchema };

export type NoteSchema = typeof noteSchema;
export type UpdateNoteSchema = typeof updateNoteSchema;
export type IdSchema = typeof idSchema;
