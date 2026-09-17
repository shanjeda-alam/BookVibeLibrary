import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const getReadBooks = () => {
  try {
    const savedBooks = JSON.parse(localStorage.getItem('readBooks') || '[]');
    return Array.isArray(savedBooks) ? savedBooks : [];
  } catch {
    return [];
  }
};

const Books = () => {
  const [readBooks, setReadBooks] = useState(() => getReadBooks());

  useEffect(() => {
    const updateReadBooks = () => setReadBooks(getReadBooks());

    updateReadBooks();
    window.addEventListener('readBooksUpdated', updateReadBooks);

    return () => {
      window.removeEventListener('readBooksUpdated', updateReadBooks);
    };
  }, []);

  if (readBooks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold">No books marked as read yet.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="mb-6 text-3xl font-bold">Read Books</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {readBooks.map((book) => (
          <Link key={book.bookId} to={`/bookDetails/${book.bookId}`} className="block">
            <article className="card bg-base-100 shadow-sm transition hover:shadow-md">
              <figure>
                <img src={book.image} alt={book.bookName} className="h-72 w-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap items-center gap-2">
                  {book.tags?.map((tag) => (
                    <span key={tag} className="badge bg-green-100 font-bold text-green-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="card-title text-2xl">{book.bookName}</h3>
                <p className="text-lg font-semibold">{book.author}</p>
                <div className="card-actions justify-between border-t border-dashed border-gray-200 pt-2">
                  <span className="font-semibold">{book.category}</span>
                  <span className="badge badge-success text-white">Read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Books;