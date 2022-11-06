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

  async getAllBook(req, res) {
    try {
      if (books.length === 0) {
        return res.status(200).json({
          status: false,
          message: 'Tidak Ada Buku',
          data: {
            books: [],
          },
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Semua buku berhasil didapatkan',
        data: {
          books,
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ status: false, message: error.message });
    }
  }

  async getBookByIdHandler(req, res) {
    try {
      const { bookId } = req.params;

      const book = books.filter((b) => b.id === bookId)[0];
      if (!book) {
        throw { code: 404, message: 'Buku tidak ditemukan' };
      }

      return res.status(200).json({
        status: true,
        data: {
          book,
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ status: false, message: error.message });
    }
  }

  async editBookByIdHandler(req, res) {
    try {
      const { bookId } = req.params;
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

      const updatedAt = new Date().toISOString();
      const index = books.findIndex((book) => book.id === bookId);

      // Jika bookId tidak ada
      if (index === -1) {
        throw {
          code: 400,
          message: 'Gagal memperbarui buku. bookId tidak ditemukan',
        };
      }

      if (!name) {
        throw {
          code: 400,
          message: 'Gagal edit buku. Mohon isi nama buku',
        };
      }

      if (pageCount < readPage) {
        throw {
          code: 400,
          message:
            'Gagal edit buku. readPage tidak boleh lebih besar dari pageCount',
        };
      }

      const finished = pageCount === readPage;

      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
      };

      return res.status(200).json({
        status: true,
        message: 'Buku berhasil diperbarui',
        data: {
          bookId,
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ status: false, message: error.message });
    }
  }

  async deleteBookByIdHandler(req, res) {
    try {
      const { bookId } = req.params;

      const index = books.findIndex((book) => book.id === bookId);

      if (index === -1) {
        throw {
          code: 400,
          message: 'Buku gagal dihapus. bookId tidak ditemukan',
        };
      }

      books.splice(index, 1);

      return res.status(200).json({
        status: true,
        message: 'Buku berhasil dihapus',
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({ status: false, message: error.message });
    }
  }
}

export default new BooksController();
