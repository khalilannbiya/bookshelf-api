import { nanoid } from 'nanoid';
import books from '../data/books.js';

class BooksController {
  async addBook(req, res) {
    try {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = req.body;

      if (!name) {
        throw {
          code: 400,
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        };
      }

      if (pageCount < readPage) {
        throw {
          code: 400,
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        };
      }

      const id = nanoid(16);
      const insertedAt = new Date().toISOString();
      const updatedAt = insertedAt;
      const finished = pageCount === readPage;

      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      };

      books.push(newBook);

      const isSuccess = books.filter((book) => book.id === id).length > 0;

      if (!isSuccess) {
        throw {
          code: 500,
          message: 'Buku gagal ditambahkan',
        };
      }

      return res.status(201).json({
        status: true,
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ status: false, message: error.message });
    }
  }
}

export default new BooksController();
