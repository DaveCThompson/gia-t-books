// src/features/BookReader/Page.tsx

import React from 'react';
import Image from 'next/image';
import parse, { domToReact, HTMLReactParserOptions, DOMNode } from 'html-react-parser';
import { Element } from 'domhandler';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './Page.module.css';

interface PageData {
  pageNumber: number;
  text: string;
  illustration?: string;
  mask?: string;
}

interface PageProps {
  pageData: PageData;
}

const Page: React.FC<PageProps> = ({ pageData }) => {
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      // FIX: Now correctly looking for the 'interactive' tag
      if (domNode instanceof Element && domNode.name === 'interactive') {
        const definition = domNode.attribs.definition || 'No definition available.';
        
        return (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className={styles.interactiveWord}>
                {domToReact(domNode.children as DOMNode[], parserOptions)}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                {definition}
                <Tooltip.Arrow className={styles.tooltipArrow} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        );
      }
    },
  };

  return (
    <Tooltip.Provider delayDuration={100}>
      <div className={styles.pageContainer}>
        {pageData.illustration && (
          <div
            className={styles.imageContainer}
            style={{ maskImage: `url(${pageData.mask})`, WebkitMaskImage: `url(${pageData.mask})` }}
          >
            {/* FIX: Using the modern `fill` prop on the Image component */}
            <Image
              src={pageData.illustration}
              alt={`Illustration for page ${pageData.pageNumber}`}
              fill
              className={styles.imageFill} // Apply styles directly to the image
              priority={true}
            />
          </div>
        )}
        <p className={styles.text}>{parse(pageData.text, parserOptions)}</p>
      </div>
    </Tooltip.Provider>
  );
};

export default Page;