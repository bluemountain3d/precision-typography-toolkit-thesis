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
      upmAscender: ascender - overshoot,
      upmDescender: absDescender - overshoot,
    };
  }

  return {
    upmAscender: ascender,
    upmDescender: absDescender,
  };
};
