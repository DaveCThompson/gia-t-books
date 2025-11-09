// src/features/BookReader/Page.tsx

import React from 'react';
import Image from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';
import { PageData } from '@/data/types';
import { InteractiveText } from './InteractiveText'; // Import the new component
import styles from './Page.module.css';

interface PageProps {
  pageData: PageData;
}

const Page: React.FC<PageProps> = ({ pageData }) => {
  return (
    <Tooltip.Provider delayDuration={100}>
      <div className={styles.pageContainer}>
        {pageData.illustration && (
          <div
            className={styles.imageContainer}
            style={{ maskImage: `url(${pageData.mask})`, WebkitMaskImage: `url(${pageData.mask})` }}
          >
            <Image
              src={pageData.illustration}
              alt={`Illustration for page ${pageData.pageNumber}`}
              fill
              className={styles.imageFill}
              priority={true}
            />
          </div>
        )}
        <p className={styles.text}>
          {/* All parsing logic is now handled by this single, dedicated component */}
          <InteractiveText text={pageData.text} />
        </p>
      </div>
    </Tooltip.Provider>
  );
};

export default Page;