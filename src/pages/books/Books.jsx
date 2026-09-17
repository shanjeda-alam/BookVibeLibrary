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

const getWishlistBooks = () => {
  try {
    const savedBooks = JSON.parse(localStorage.getItem('wishlistBooks') || '[]');
    return Array.isArray(savedBooks) ? savedBooks : [];
  } catch {
    return [];
  }
};

const Books = () => {
  const [readBooks, setReadBooks] = useState(() => getReadBooks());
  const [wishlistBooks, setWishlistBooks] = useState(() => getWishlistBooks());
  const [activeList, setActiveList] = useState('read');

  useEffect(() => {
    const updateReadBooks = () => setReadBooks(getReadBooks());
    const updateWishlistBooks = () => setWishlistBooks(getWishlistBooks());

    updateReadBooks();
    updateWishlistBooks();
    window.addEventListener('readBooksUpdated', updateReadBooks);
    window.addEventListener('wishlistBooksUpdated', updateWishlistBooks);

    return () => {
      window.removeEventListener('readBooksUpdated', updateReadBooks);
      window.removeEventListener('wishlistBooksUpdated', updateWishlistBooks);
    };
  }, []);

  const booksToShow = activeList === 'read' ? readBooks : wishlistBooks;

  if (booksToShow.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="mb-8 flex justify-center gap-3">
          <button className={`btn ${activeList === 'read' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveList('read')}>
            Read List
          </button>
          <button className={`btn ${activeList === 'wishlist' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveList('wishlist')}>
            Wish List
          </button>
        </div>
        <h2 className="text-2xl font-bold">
          {activeList === 'read' ? 'No books marked as read yet.' : 'No books added to your wishlist yet.'}
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">{activeList === 'read' ? 'Read Books' : 'Wish List'}</h2>
        <div className="flex gap-3">
          <button className={`btn ${activeList === 'read' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveList('read')}>
            Read List
          </button>
          <button className={`btn ${activeList === 'wishlist' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveList('wishlist')}>
            Wish List
          </button>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {booksToShow.map((book) => (
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