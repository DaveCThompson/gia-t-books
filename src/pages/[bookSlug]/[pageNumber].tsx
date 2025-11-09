// src/pages/[bookSlug]/[pageNumber].tsx

import React from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import BookReader from '@/features/BookReader/BookReader';
import { BookData } from '@/data/types';
import { bookDataMap } from '@/data/constants'; // Use centralized data map

interface BookPageProps {
  bookData: BookData;
  currentPage: number;
}

const BookPage: NextPage<BookPageProps> = ({ bookData, currentPage }) => {
  if (!bookData) {
    return <div>Book not found.</div>;
  }
  return <BookReader bookData={bookData} currentPage={currentPage} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  for (const slug in bookDataMap) {
    const book = bookDataMap[slug];
    for (const page of book.pages) {
      paths.push({
        params: {
          bookSlug: slug,
          pageNumber: page.pageNumber.toString(),
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
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