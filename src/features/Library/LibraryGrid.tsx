// src/features/Library/LibraryGrid.tsx

import React from 'react';
import { BookData } from '@/data/types';
import BookCover from './BookCover';
import styles from './LibraryGrid.module.css';

interface LibraryGridProps {
  books: BookData[];
}

const LibraryGrid: React.FC<LibraryGridProps> = ({ books }) => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gia's Books</h1>
        <p className={styles.subtitle}>Select a story to begin</p>
      </header>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCover key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
};

export default LibraryGrid;