// src/data/types.ts

// This file is the single source of truth for our data structures.

export interface PageData {
  pageNumber: number;
  text: string;
  // FIX: Make illustration and mask optional properties to match the data
  illustration?: string;
  mask?: string;
  narrationUrl?: string;
}

export interface BookData {
  slug: string;
  title: string;
  author: string;
  pages: PageData[];
}