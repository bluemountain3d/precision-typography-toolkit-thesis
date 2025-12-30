import type { Font } from 'fontkit';

interface FontWithPost extends Font {
  post?: {
    isFixedPitch: number;
  };
}

export const getCategory = (font: FontWithPost): string => {
  // 1. Check if monospace
  if (font.post?.isFixedPitch === 1) {
    return 'monospace';
  }

  // 2. Check PANOSE
  const panose = font['OS/2']?.panose;
  if (panose && panose.length > 0) {
    const familyKind = panose[0];

    if (familyKind === 3) return 'cursive';
    if (familyKind === 4) return 'fantasy';

    if (familyKind === 2) {
      const serifStyle = panose[1];
      if (serifStyle === 11 || serifStyle === 12) return 'sans-serif';
      if (serifStyle >= 2 && serifStyle <= 10) return 'serif';
      // Latin Text with unspecified - assume serif
      return 'serif';
    }
  }

  // 3. Fallback: Check sFamilyClass
  const familyClass = font['OS/2']?.sFamilyClass;
  if (familyClass) {
    const classId = familyClass >> 8;
    if (classId >= 1 && classId <= 7) return 'serif';
    if (classId === 8) return 'sans-serif';
    if (classId === 10) return 'cursive';
    if (classId === 12) return 'fantasy';
  }

  // 4. Last resort: Name matching
  const name = font.familyName.toLowerCase();
  if (
    /(serif|goudy|garamond|times|georgia|playfair|bodoni|caslon|baskerville)/.test(
      name
    )
  ) {
    return 'serif';
  }

  // 5. Default
  return 'sans-serif';
};
