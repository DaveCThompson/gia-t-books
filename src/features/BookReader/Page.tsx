// src/features/BookReader/Page.tsx

import React from 'react';
import Image from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion, Variants } from 'framer-motion'; // Import the Variants type
import { PageData } from '@/data/types';
import { InteractiveText } from './InteractiveText';
import styles from './Page.module.css';

interface PageProps {
  pageData: PageData;
  isActive: boolean;
}

// Explicitly type the variants object with the Variants type
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Page: React.FC<PageProps> = ({ pageData, isActive }) => {
  return (
    <Tooltip.Provider delayDuration={100}>
      <motion.div
        className={styles.pageContainer}
        variants={pageVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {pageData.illustration && (
          <div
            className={styles.imageContainer}
            style={{
              maskImage: `url(${pageData.mask})`,
              WebkitMaskImage: `url(${pageData.mask})`,
            }}
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
          <InteractiveText text={pageData.text} />
        </p>
      </motion.div>
    </Tooltip.Provider>
  );
};

export default Page;