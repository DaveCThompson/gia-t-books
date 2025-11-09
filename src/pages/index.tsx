// src/pages/index.tsx

import React from 'react';
import Link from 'next/link';
import LibraryGrid from '@/features/Library/LibraryGrid';

const HomePage = () => {
  return (
    <div>
      <LibraryGrid />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Development Links</h2>
        {/* The fix is to remove the inner <a> tag and move its props to the Link component */}
        <Link href="/slimey/1" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Slimey - Page 1
        </Link>
      </div>
    </div>
  );
};

export default HomePage;