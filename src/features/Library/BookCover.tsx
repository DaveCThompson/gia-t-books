// src/features/Library/BookCover.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookData } from '@/data/types';
import styles from './BookCover.module.css';

interface BookCoverProps {
  book: BookData;
}

const BookCover: React.FC<BookCoverProps> = ({ book }) => {
  // Find the first page with an illustration to use as a cover image
  const coverImage = book.pages.find((page) => page.illustration)?.illustration;

  return (
    <Link href={`/${book.slug}/1`} className={styles.coverLink}>
      <div className={styles.coverContainer}>
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`Cover for ${book.title}`}
            fill
            className={styles.coverImage}
          />
        ) : (
          <div className={styles.placeholderImage} />
        )}
        <div className={styles.overlay} />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.author}>by {book.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCover;