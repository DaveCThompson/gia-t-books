// src/components/ExpressiveText.tsx

import React from 'react';
import styles from './ExpressiveText.module.css';

interface ExpressiveTextProps {
  children: React.ReactNode;
  style: string;
}

const ExpressiveText: React.FC<ExpressiveTextProps> = ({ children, style }) => {
  const className = styles[style] || '';
  return <span className={className}>{children}</span>;
};

export default ExpressiveText;