// src/features/BookReader/Navigation.tsx

import React from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  isPlaying: boolean;
  hasNarration: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPlayPause,
  isPlaying,
  hasNarration,
}) => {
  return (
    <div className={styles.navContainer}>
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={styles.navButton}
      >
        &larr; Prev
      </button>

      <div className={styles.pageInfo}>
        <button
          onClick={onPlayPause}
          disabled={!hasNarration}
          className={styles.playButton}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={styles.navButton}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Navigation;