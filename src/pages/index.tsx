// src/pages/index.tsx

import React from 'react';
import LibraryGrid from '@/features/Library/LibraryGrid';
import { allBooks } from '@/data/constants';
import { BookData } from '@/data/types';

interface HomePageProps {
  books: BookData[];
}

const HomePage: React.FC<HomePageProps> = ({ books }) => {
  return (
    <div>
      {/* FIX: The `books` prop was not being passed to the component. */}
      <LibraryGrid books={books} />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      books: allBooks,
    },
  };
}

export default HomePage;