// src/features/BookReader/BookReader.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { useSettingsStore } from '@/data/settings';
import { useAudioPlayer } from '@/data/useAudioPlayer';
import { BookData } from '@/data/types'; // FIX: Import shared type
import Page from './Page';
import NarrationControls from './NarrationControls';
import styles from './BookReader.module.css';

// FIX: Removed local type definitions, using imported ones now.
interface BookReaderProps {
  bookData: BookData;
  currentPage: number;
}

const BookReader: React.FC<BookReaderProps> = ({ bookData, currentPage }) => {
  const router = useRouter();
  const { readingMode } = useSettingsStore();
  const { play, stop } = useAudioPlayer();
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

  const handleSlideChange = (swiper: SwiperInstance) => {
    const newPageNumber = swiper.activeIndex + 1;
    const url = `/${bookData.slug}/${newPageNumber}`;
    router.push(url, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!swiperInstance) return;

    const activePage = bookData.pages[swiperInstance.activeIndex];
    
    if (readingMode === 'narrated' && activePage?.narrationUrl) {
      play(activePage.narrationUrl);
    } else {
      stop();
    }
  }, [readingMode, swiperInstance, bookData.pages, play, stop]);

  return (
    <div className={styles.bookReaderContainer}>
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