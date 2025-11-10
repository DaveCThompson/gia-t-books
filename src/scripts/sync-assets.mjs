// src/scripts/sync-assets.mjs

import path from 'path';
import { glob } from 'glob';
import fs from 'fs-extra';

const CWD = process.cwd();
const SRC_DIR = path.join(CWD, 'src', 'books');
const PUBLIC_DIR = path.join(CWD, 'public', 'books');

async function syncAssets() {
  try {
    // 1. Clean the destination directory to prevent locking (EBUSY) errors.
    // This ensures a fresh state on every run.
    console.log(`🧹 Cleaning asset directory: ${PUBLIC_DIR}`);
    await fs.emptyDir(PUBLIC_DIR);

    // 2. Find all asset files using a more specific glob pattern.
    // The `nodir: true` option ensures we only get files.
    const assetFiles = await glob('**/assets/**/*', { cwd: SRC_DIR, nodir: true });

    if (assetFiles.length === 0) {
      console.log('No assets found to sync.');
      return;
    }

    console.log(`Found ${assetFiles.length} asset files. Starting sync...`);

    // 3. Copy each file to its corresponding location in the public directory.
    const copyPromises = assetFiles.map(async (file) => {
      const sourcePath = path.join(SRC_DIR, file);
      const destPath = path.join(PUBLIC_DIR, file);
      await fs.copy(sourcePath, destPath);
    });

    await Promise.all(copyPromises);
    console.log('✅ All book assets synced to public directory.');
  } catch (error) {
    console.error('❌ Error syncing assets:', error);
    process.exit(1);
  }
}

syncAssets();