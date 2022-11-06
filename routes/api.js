import express from 'express';
import BooksController from '../controllers/BooksController.js';

const router = express.Router();

router.post('/books', BooksController.addBook);
router.get('/books', BooksController.getAllBook);
router.get('/books/:bookId', BooksController.getBookByIdHandler);
router.put('/books/:bookId', BooksController.editBookByIdHandler);

export default router;
