// src/pages/[bookSlug]/[pageNumber].tsx

import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import BookReader from '@/features/BookReader/BookReader';
import { BookData } from '@/data/types'; // FIX: Import shared type
import slimeyData from '@/books/slimey/data.json';

// FIX: Removed local type definitions, using imported ones now.
interface BookPageProps {
  bookData: BookData;
  currentPage: number;
}

const bookDataMap: { [key: string]: BookData } = {
  slimey: slimeyData,
};

const BookPage: NextPage<BookPageProps> = ({ bookData, currentPage }) => {
  if (!bookData) {
    return <div>Book not found.</div>;
  }
  return <BookReader bookData={bookData} currentPage={currentPage} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookSlug, pageNumber } = context.params || {};

  const slug = typeof bookSlug === 'string' ? bookSlug : '';
  const pageNum = typeof pageNumber === 'string' ? parseInt(pageNumber, 10) : 1;

  const bookData = bookDataMap[slug] || null;

  if (!bookData || isNaN(pageNum)) {
    return { notFound: true };
  }

  return {
    props: {
      bookData,
      currentPage: pageNum,
    },
  };
};

export default BookPage;