// src/scripts/validate-content.mjs

import path from 'path';
import fs from 'fs/promises';
import { glob } from 'glob';
import { bookDataSchema } from '../data/schemas/book.schema.mjs';

const CWD = process.cwd();
const BOOKS_DIR = path.join(CWD, 'src', 'books');

async function validateContent() {
  console.log('🔍 Starting content validation...');
  try {
    const dataFiles = await glob('**/data.json', { cwd: BOOKS_DIR });
    let errorCount = 0;

    if (dataFiles.length === 0) {
      throw new Error('No book data.json files found.');
    }

    console.log(`Found ${dataFiles.length} book(s) to validate.`);

    for (const file of dataFiles) {
      const filePath = path.join(BOOKS_DIR, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      const result = bookDataSchema.safeParse(jsonData);

      if (result.success) {
        console.log(`  ✅ Validated: ${file}`);
      } else {
        errorCount++;
        console.error(`  ❌ Invalid: ${file}`);
        // Log detailed errors from Zod
        result.error.issues.forEach((issue) => {
          console.error(`    - Path: ${issue.path.join('.')}, Message: ${issue.message}`);
        });
      }
    }

    if (errorCount > 0) {
      throw new Error(`${errorCount} book(s) failed validation.`);
    }

    console.log('✅ All content successfully validated!');
  } catch (error) {
    console.error('❌ Content validation failed:', error.message);
    process.exit(1);
  }
}

validateContent();