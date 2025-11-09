// src/features/BookReader/BookReader.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { useSettingsStore } from '@/data/settings';
import { useAudioPlayer } from '@/data/useAudioPlayer';
import { BookData, PageData } from '@/data/types';
import Page from './Page';
import NarrationControls from './NarrationControls';
import Navigation from './Navigation'; // Import the new component
import styles from './BookReader.module.css';

interface BookReaderProps {
  bookData: BookData;
  currentPage: number;
}

const BookReader: React.FC<BookReaderProps> = ({ bookData, currentPage }) => {
  const router = useRouter();
  const { readingMode } = useSettingsStore();
  const { play, stop, isPlaying } = useAudioPlayer();
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);
  const [activePage, setActivePage] = useState<PageData>(bookData.pages[currentPage - 1]);

  const handleSlideChange = (swiper: SwiperInstance) => {
    const newPageNumber = swiper.activeIndex + 1;
    const newActivePage = bookData.pages[swiper.activeIndex];
    setActivePage(newActivePage);

    const url = `/${bookData.slug}/${newPageNumber}`;
    // Use replace to avoid bloating browser history with page-by-page navigation
    router.replace(url, undefined, { shallow: true });
  };

  // Auto-play logic for "narrated" mode
  useEffect(() => {
    if (readingMode === 'narrated' && activePage?.narrationUrl) {
      play(activePage.narrationUrl);
    } else {
      stop();
    }
    // Re-run this effect only when the active page or reading mode changes
  }, [readingMode, activePage, play, stop]);

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      stop();
    } else if (activePage?.narrationUrl) {
      play(activePage.narrationUrl);
    }
  }, [isPlaying, activePage, play, stop]);


  return (
    <div className={styles.bookReaderContainer}>
      <Navigation
        currentPage={activePage.pageNumber}
        totalPages={bookData.pages.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onPlayPause={handlePlayPause}
        isPlaying={isPlaying}
        hasNarration={!!activePage.narrationUrl}
      />
      <Swiper
        onSwiper={setSwiperInstance}
        initialSlide={currentPage - 1}
        onSlideChange={handleSlideChange}
        className={styles.swiperContainer}
      >
        {bookData.pages.map((page) => (
          <SwiperSlide key={page.pageNumber}>
            <Page pageData={page} />
          </SwiperSlide>
        ))}
      </Swiper>
      <NarrationControls />
    </div>
  );
};

export default BookReader;