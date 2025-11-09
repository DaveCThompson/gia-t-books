import React from 'react';
import styles from './LibraryGrid.module.css';

const LibraryGrid = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Slimey by Gia</h1>
      <p>Book covers will be displayed here.</p>
    </div>
  );
};

export default LibraryGrid;