import express from 'express';
import router from './routes/notesRoute';

const port = process.env.Port || 3001;

const app = express();
app.use(express.json());

app.use('/api', router);

app.all('*', (req, res) => {
  res.status(404).json('Endpoint doesn`t exist');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
