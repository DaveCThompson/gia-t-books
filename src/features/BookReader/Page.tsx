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
      // FIX: Now checking for 'interactive' tag
      if (domNode instanceof Element && domNode.name === 'interactive') {
        const definition = domNode.attribs.definition || 'No definition available.';
        
        return (
          // NOTE: The Tooltip.Root is now inside the parser, but the Provider is outside.
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
    // FIX: A single Tooltip.Provider now wraps the entire page content.
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
              layout="fill"
              objectFit="cover"
              priority={true} // Helps load the first visible image faster
            />
          </div>
        )}
        <p className={styles.text}>{parse(pageData.text, parserOptions)}</p>
      </div>
    </Tooltip.Provider>
  );
};

export default Page;