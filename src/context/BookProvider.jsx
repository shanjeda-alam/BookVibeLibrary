import React, { createContext, useEffect, useState } from 'react';

const BookContext = createContext();

const getReadBooks = () => {
  try {
    const savedBooks = JSON.parse(localStorage.getItem('readBooks') || '[]');
    return Array.isArray(savedBooks) ? savedBooks : [];
  } catch {
    return [];
  }
};

const BookProvider = ({ children }) => {
  const [readBooks, setReadBooks] = useState(() => getReadBooks());

  useEffect(() => {
    const syncReadBooks = () => setReadBooks(getReadBooks());

    window.addEventListener('readBooksUpdated', syncReadBooks);
    return () => window.removeEventListener('readBooksUpdated', syncReadBooks);
  }, []);

  const value = {
    readBooks,
    setReadBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export { BookContext };
export default BookProvider;