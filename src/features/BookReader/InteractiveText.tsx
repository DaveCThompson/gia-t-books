// src/features/BookReader/InteractiveText.tsx

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './Page.module.css'; // We can reuse the existing styles

interface InteractiveTextProps {
  text: string;
}

// Regex to find our custom tags, e.g., [interactive:definition]word[/interactive]
const tagRegex = /\[(\w+)(?::([^\]]+))?\](.*?)\[\/\1\]/g;

export const InteractiveText: React.FC<InteractiveTextProps> = ({ text }) => {
  const parts = text.split(tagRegex);
  // The resulting array from split will have groups of:
  // [normal text, tag, value, content, normal text, ...]

  const elements = [];
  for (let i = 0; i < parts.length; i += 4) {
    // Regular text part
    if (parts[i]) {
      elements.push(<React.Fragment key={`text-${i}`}>{parts[i]}</React.Fragment>);
    }

    // Tagged part
    const tag = parts[i + 1];
    const value = parts[i + 2];
    const content = parts[i + 3];

    if (tag) {
      if (tag === 'interactive') {
        elements.push(
          <Tooltip.Root key={`interactive-${i}`}>
            <Tooltip.Trigger asChild>
              <span className={styles.interactiveWord}>{content}</span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                {value || 'No definition available.'}
                <Tooltip.Arrow className={styles.tooltipArrow} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        );
      } else if (tag === 'expressive') {
        let className = styles.expressiveDefault;
        switch (value) {
          case 'shout':
            className = styles.expressiveShout;
            break;
          case 'bully':
            className = styles.expressiveBully;
            break;
          case 'handwritten':
            className = styles.expressiveHandwritten;
            break;
        }
        elements.push(
          <span key={`expressive-${i}`} className={className}>
            {content}
          </span>
        );
      }
    }
  }

  return <>{elements}</>;
};