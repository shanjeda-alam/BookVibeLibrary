import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FcRating } from '@react-icons/all-files/Fc/FcRating';

const booksPromise = fetch('/data/booksData.json').then((response) => {
  if (!response.ok) {
    throw new Error('Could not load books data');
  }

  return response.json();
});

const getReadBooks = () => {
  try {
    const savedBooks = JSON.parse(localStorage.getItem('readBooks') || '[]');
    return Array.isArray(savedBooks) ? savedBooks : [];
  } catch {
    return [];
  }
};

const AllBooks = () => {
  const books = use(booksPromise);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const updateReadBooks = () => setReadBooks(getReadBooks());

    updateReadBooks();
    window.addEventListener('readBooksUpdated', updateReadBooks);

    return () => {
      window.removeEventListener('readBooksUpdated', updateReadBooks);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const isRead = readBooks.some((savedBook) => String(savedBook.bookId) === String(book.bookId));

          return (
            <Link key={book.bookId} to={`/bookDetails/${book.bookId}`} className="block">
              <article className="card bg-base-100 shadow-sm transition hover:shadow-md">
                <figure className="relative">
                  <img src={book.image} alt={book.bookName} className="h-72 w-full object-cover" />
                  {isRead && (
                    <span className="badge badge-success absolute right-3 top-3 text-white">
                      Read
                    </span>
                  )}
                </figure>
                <div className="card-body">
                  <div className="flex flex-wrap items-center gap-2">
                    {book.tags.map((tag) => (
                      <span key={tag} className="badge bg-green-100 font-bold text-green-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="card-title text-2xl">{book.bookName}</h3>
                  <p className="text-lg font-semibold">{book.author}</p>
                  <div className="card-actions justify-between border-t border-dashed border-gray-200 pt-2">
                    <span className="font-semibold">{book.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-outline gap-1">
                        {book.rating}
                        <FcRating />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllBooks;