export const getCorrectedAscenderDescender = (
  ascender: number,
  descender: number,
  unitsPerEm: number
) => {
  const absDescender = Math.abs(descender);
  const totalHeight = ascender + absDescender;

  if (totalHeight > unitsPerEm) {
    const overshoot = (totalHeight - unitsPerEm) / 2;
    return {
      actualAscender: ascender - overshoot,
      actualDescender: absDescender - overshoot,
    };
  }

  return {
    actualAscender: ascender,
    actualDescender: absDescender,
  };
};
