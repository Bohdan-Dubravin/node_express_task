import express from 'express';

const port = process.env.Port || 3000;

const app = express();
app.use(express.json());

app.use('api/v1');

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
