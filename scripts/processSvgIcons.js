import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const ICONS_DIR = './src/assets/icons';

async function processSvgFiles() {
  const files = await readdir(ICONS_DIR);
  const svgFiles = files.filter((f) => f.endsWith('.svg'));

  for (const file of svgFiles) {
    const filePath = join(ICONS_DIR, file);
    let content = await readFile(filePath, 'utf-8');

    // Ta bort width och height från <svg> taggen (men inte från andra element)
    content = content.replace(/(<svg[^>]*)\s*width="[^"]*"/, '$1');
    content = content.replace(/(<svg[^>]*)\s*height="[^"]*"/, '$1');

    // Sätt fill="currentColor" på path/circle/rect/polygon etc (inte fill="none")
    content = content.replace(
      /<(path|circle|rect|polygon|ellipse|line|polyline|text)([^>]*)fill="(?!none)[^"]*"/g,
      '<$1$2fill="currentColor"'
    );

    // Samma för stroke
    content = content.replace(
      /<(path|circle|rect|polygon|ellipse|line|polyline|text)([^>]*)stroke="(?!none)[^"]*"/g,
      '<$1$2stroke="currentColor"'
    );

    await writeFile(filePath, content, 'utf-8');
    console.log(`✅ Processed: ${file}`);
  }
}

processSvgFiles().catch(console.error);
