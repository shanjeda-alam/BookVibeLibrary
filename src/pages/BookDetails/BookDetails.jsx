import React, { use, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

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

const getWishlistBooks = () => {
  try {
    const savedBooks = JSON.parse(localStorage.getItem('wishlistBooks') || '[]');
    return Array.isArray(savedBooks) ? savedBooks : [];
  } catch {
    return [];
  }
};

function BookDetails() {
  const { id } = useParams();
  const books = use(booksPromise);
  const selectedBook = books.find((book) => String(book.bookId) === String(id));
  const [readBooks, setReadBooks] = useState(() => getReadBooks());
  const [wishlistBooks, setWishlistBooks] = useState(() => getWishlistBooks());

  if (!selectedBook) {
    return <div className="container mx-auto px-4 py-12 text-center">Book not found.</div>;
  }

  const {
    bookName,
    author,
    image,
    review,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = selectedBook;

  const isAlreadyRead = readBooks.some((book) => String(book.bookId) === String(id));
  const isInWishlist = wishlistBooks.some((book) => String(book.bookId) === String(id));

  const handleMarkAsRead = () => {
    const savedBooks = getReadBooks();
    const isExistBook = savedBooks.some((book) => String(book.bookId) === String(id));

    if (isExistBook) {
      toast.error('The book is already exist');
      return;
    }

    const updatedBooks = [...savedBooks, selectedBook];
    localStorage.setItem('readBooks', JSON.stringify(updatedBooks));
    setReadBooks(updatedBooks);
    window.dispatchEvent(new Event('readBooksUpdated'));
    toast.success('Book marked as read');
  };

  const handleWishlist = () => {
    const savedBooks = getWishlistBooks();
    const isAlreadyInWishlist = savedBooks.some((book) => String(book.bookId) === String(id));

    if (isAlreadyInWishlist) {
      toast.error('The book is already in your wishlist');
      return;
    }

    const updatedBooks = [...savedBooks, selectedBook];
    localStorage.setItem('wishlistBooks', JSON.stringify(updatedBooks));
    setWishlistBooks(updatedBooks);
    window.dispatchEvent(new Event('wishlistBooksUpdated'));
    toast.success('Book added to wishlist');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-6 rounded-xl bg-base-100 shadow-sm lg:grid-cols-2">
        <figure className="flex items-center justify-center bg-gray-100 p-6">
          <img src={image} alt={bookName} className="h-[400px] object-cover" />
        </figure>

        <div className="card-body space-y-4 p-6">
          <h2 className="card-title text-3xl">{bookName}</h2>
          <h3 className="text-2xl font-semibold">{author}</h3>
          <p className="border-y py-2 font-medium">{category}</p>
          <p className="text-gray-700">Review: {review}</p>

          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span key={tag} className="badge bg-green-100 font-bold text-green-500">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between gap-2">
              <span>Rating</span>
              <span>{rating}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Number of Pages</span>
              <span>{totalPages}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Publisher</span>
              <span>{publisher}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Year of Publishing</span>
              <span>{yearOfPublishing}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="btn btn-primary" onClick={handleMarkAsRead}>
              {isAlreadyRead ? 'Already Read' : 'Mark as Read'}
            </button>
            <button className="btn btn-primary btn-outline" onClick={handleWishlist}>
              {isInWishlist ? 'Already in Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;