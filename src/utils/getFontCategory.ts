import type { Font } from 'fontkit';

interface FontWithPost extends Font {
  post?: {
    isFixedPitch: number;
  };
}

export const getCategory = (font: FontWithPost): string => {
  const os2 = font['OS/2'];
  const name = (font.familyName || '').toLowerCase();
  const postscript = (font.postscriptName || '').toLowerCase();

  // --- 1. MONOSPACE (Högsta prioritet) ---
  // Kontrollera via metadata
  const isMonoOS2 = os2?.panose?.[3] === 9;
  // Kontrollera via faktiska glyfer (viktigt om metadata ljuger)
  const glyphI = font.glyphForCodePoint('i'.charCodeAt(0));
  const glyphM = font.glyphForCodePoint('m'.charCodeAt(0));
  const isStrictMono = glyphI.advanceWidth === glyphM.advanceWidth;

  if (isMonoOS2 || isStrictMono) return 'monospace';

  // --- 2. CURSIVE / SCRIPT ---
  const panoseKind = os2?.panose?.[0];
  if (panoseKind === 3) return 'cursive';

  // sFamilyClass 10 = Scripts
  if (os2?.sFamilyClass >> 8 === 10) return 'cursive';

  // Om namnet innehåller script/handwriting-liknande ord
  if (/(script|handwriting|cursive|italic|calligraphy)/.test(name)) {
    return 'cursive';
  }

  // --- 3. SERIF VS SANS-SERIF ---
  if (panoseKind === 2) {
    const serifStyle = os2.panose[1];
    // 2-10 är olika typer av seriffer
    if (serifStyle >= 2 && serifStyle <= 10) return 'serif';
    // 11-13 är Sans-serif (Normal, Rounded, etc)
    if (serifStyle >= 11 && serifStyle <= 13) return 'sans-serif';
  }

  // Fallback på sFamilyClass
  const familyClass = os2?.sFamilyClass >> 8;
  if (familyClass >= 1 && familyClass <= 7) return 'serif';
  if (familyClass === 8) return 'sans-serif';

  // --- 4. FANTASY / DECORATIVE ---
  if (panoseKind === 4 || panoseKind === 5) return 'fantasy';
  if (familyClass === 12) return 'fantasy';

  // --- 5. NAMN-MATCHING (Sista utvägen) ---
  const serifRegex =
    /(serif|goudy|garamond|times|georgia|playfair|bodoni|caslon|baskerville)/;
  if (serifRegex.test(name) || serifRegex.test(postscript)) {
    return 'serif';
  }

  // Default till sans-serif
  return 'sans-serif';
};

// export const getCategory = (font: FontWithPost): string => {
//   // 1. Check if monospace
//   if (font.post?.isFixedPitch === 1) {
//     return 'monospace';
//   }

//   // 2. Check PANOSE
//   const panose = font['OS/2']?.panose;
//   if (panose && panose.length > 0) {
//     const familyKind = panose[0];

//     if (familyKind === 3) return 'cursive';
//     if (familyKind === 4) return 'fantasy';

//     if (familyKind === 2) {
//       const serifStyle = panose[1];
//       if (serifStyle === 11 || serifStyle === 12) return 'sans-serif';
//       if (serifStyle >= 2 && serifStyle <= 10) return 'serif';
//       // Latin Text with unspecified - assume serif
//       return 'serif';
//     }
//   }

//   // 3. Fallback: Check sFamilyClass
//   const familyClass = font['OS/2']?.sFamilyClass;
//   if (familyClass) {
//     const classId = familyClass >> 8;
//     if (classId >= 1 && classId <= 7) return 'serif';
//     if (classId === 8) return 'sans-serif';
//     if (classId === 10) return 'cursive';
//     if (classId === 12) return 'fantasy';
//   }

//   // 4. Last resort: Name matching
//   const name = font.familyName.toLowerCase();
//   if (
//     /(serif|goudy|garamond|times|georgia|playfair|bodoni|caslon|baskerville)/.test(
//       name
//     )
//   ) {
//     return 'serif';
//   }

//   // 5. Default
//   return 'sans-serif';
// };
