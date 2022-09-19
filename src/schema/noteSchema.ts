import * as yup from 'yup';

const noteSchema = yup.object().shape({
  id: yup.number().required('The value must be a string and non empty'),
  name: yup
    .string()
    .required('Name is empty')
    .min(5, 'Min length 5')
    .max(40, 'Max length 40'),
  content: yup
    .string()
    .required('Content is empty')
    .min(10, 'Min length 10')
    .max(200, 'Max length 200'),
  category: yup
    .string()
    .required('Category is not chosen')
    .oneOf(
      ['Idea', 'Task', 'Random Thought'],
      "The category must be: ['Idea', 'Task', 'Random Thought']"
    ),
});

export default noteSchema;
export type NoteSchema = typeof noteSchema;
