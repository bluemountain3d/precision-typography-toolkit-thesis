// scripts/generate-blur-placeholders.ts

import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

/**
 * Configuration
 */
const IMAGES_REL_PATH = './src/assets/images';
const OUTPUT_FILE = './src/data/blur-placeholders.json';

/**
 * Generates base64-encoded blur placeholder data URLs for all images
 * in the configured directory tree.
 *
 * The script will:
 * 1. Recursively scan the images directory
 * 2. Process all supported image formats (jpg, jpeg, png, webp, avif)
 * 3. Generate small blur placeholders (10px) using plaiceholder
 * 4. Output a JSON file mapping relative paths to base64 data URLs
 *
 * @example
 * // Run manually
 * npm run blur
 *
 * @example
 * // Runs automatically before build
 * npm run build
 *
 * @example
 * // Generated output structure
 * {
 *   "hero.jpg": "data:image/jpeg;base64,...",
 *   "products/product-1.webp": "data:image/webp;base64,..."
 * }
 */
async function generateBlurPlaceholders() {
  console.log('----------------------------------------');
  console.log('🤖 Starting Blur Placeholder Generator');
  console.log('----------------------------------------');

  // Resolve absolute path to the root images directory
  // process.cwd() is the directory where you run the npm command from
  const rootDir = path.resolve(process.cwd(), IMAGES_REL_PATH);

  console.log(`📂 Working Directory: ${process.cwd()}`);
  console.log(`🎯 Target Image Dir:  ${rootDir}`);

  try {
    // Verify that the directory exists before starting
    await fs.access(rootDir);
  } catch (e) {
    console.error(`\n❌ ERROR: Directory not found!`);
    console.error(`   Script is looking here: ${rootDir}`);
    console.error(
      `   Verify that the path is correct from where you run the command.`
    );
    process.exit(1);
  }

  try {
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    await fs.mkdir(outputDir, { recursive: true });

    const placeholders: Record<string, string> = {};

    // Start scanning (pass rootDir twice to calculate relative paths)
    await scanDirectory(rootDir, rootDir, placeholders);

    const count = Object.keys(placeholders).length;

    if (count === 0) {
      console.warn(
        '\n⚠️  No images found. Is the directory empty or using wrong file extensions?'
      );
    } else {
      await fs.writeFile(OUTPUT_FILE, JSON.stringify(placeholders, null, 2));
      console.log(`\n✨ DONE! Created ${count} placeholders.`);
      console.log(`📝 Saved to: ${OUTPUT_FILE}`);
    }
  } catch (err) {
    console.error('\n🔥 An unexpected error occurred:', err);
    process.exit(1);
  }
}

/**
 * Recursively scans a directory and generates blur placeholders for all image files.
 *
 * @param currentDir - The directory currently being scanned
 * @param rootDir - The root images directory (used to calculate relative paths)
 * @param placeholders - Accumulator object for storing generated placeholders
 *
 * @remarks
 * This function is recursive and will traverse all subdirectories.
 * Supported formats: jpg, jpeg, png, webp, avif
 *
 * @example
 * // Directory structure:
 * // src/assets/images/
 * //   hero.jpg
 * //   products/
 * //     product-1.webp
 *
 * // Results in placeholders:
 * {
 *   "hero.jpg": "data:...",
 *   "products/product-1.webp": "data:..."
 * }
 */
async function scanDirectory(
  currentDir: string,
  rootDir: string,
  placeholders: Record<string, string>
) {
  // Read contents of current directory
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      // RECURSION: If it's a directory, dive into it!
      // We pass 'rootDir' unchanged so we remember where we started
      await scanDirectory(fullPath, rootDir, placeholders);
    } else if (entry.isFile()) {
      // Filter: Only process image files
      if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(entry.name)) continue;

      try {
        const fileBuffer = await fs.readFile(fullPath);

        // Generate blur placeholder (size: 10 is usually optimal for blur)
        const { base64 } = await getPlaiceholder(fileBuffer, { size: 10 });

        // Create a relative key (e.g., "subfolder/image.jpg")
        // path.relative calculates the difference between rootDir and file location
        const relativePath = path
          .relative(rootDir, fullPath)
          .replace(/\\/g, '/'); // Convert Windows backslashes to forward slashes

        placeholders[relativePath] = base64;
        console.log(`✓ [${relativePath}]`);
      } catch (err) {
        console.error(`✗ Could not process: ${entry.name}`);
      }
    }
  }
}

// Run the script
generateBlurPlaceholders();
