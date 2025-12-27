import type { Font } from 'fontkit';

interface FontWithPost extends Font {
  post?: {
    isFixedPitch: number;
  };
}

export const getCategory = (font: FontWithPost): string => {
  // Check if monospace
  if (font.post?.isFixedPitch === 1) {
    return 'monospace';
  }

  // Check panose for serif/sans/Script/Decorative
  const panose = font['OS/2']?.panose;
  if (panose && panose.length > 0) {
    const familyKind = panose[0];

    // Handwritten/Script
    if (familyKind === 3) {
      return 'cursive';
    }

    // Decorative
    if (familyKind === 4) {
      return 'fantasy';
    }

    // Latin Text - check serif style
    if (familyKind === 2) {
      const serifStyle = panose[1];
      if (serifStyle >= 2 && serifStyle <= 10) {
        return 'serif';
      }
    }
  }

  // Default to sans-serif
  return 'sans-serif';
};
