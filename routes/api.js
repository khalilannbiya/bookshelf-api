import express from 'express';
import BooksController from '../controllers/BooksController.js';

const router = express.Router();

router.post('/books', BooksController.addBook);

export default router;
