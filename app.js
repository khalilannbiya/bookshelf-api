import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Cors
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
