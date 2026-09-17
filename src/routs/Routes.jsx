import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Homepages from '../pages/homepages/Homepages';
import Books from '../pages/books/Books';
import BookDetails from '../pages/BookDetails/BookDetails';
import ErrorPage from '../pages/errorpages/error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepages />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/page-to-read',
        element: <Books />,
      },
      {
        path: '/bookDetails/:id',
        element: <BookDetails />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default function Routes() {
  return null;
}