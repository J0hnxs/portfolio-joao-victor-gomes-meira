import React from 'react';
import { motion } from 'motion/react';

interface PreviewProps {
  color: string;
  size: number;
  radius: number;
  distance: number;
  intensity: number;
  blur: number;
  shape: 'flat' | 'concave' | 'convex' | 'pressed';
}

export const Preview: React.FC<PreviewProps> = ({
  color,
  size,
  radius,
  distance,
  intensity,
  blur,
  shape,
}) => {
  const getLuminance = (hex: string, factor: number) => {
    let col = hex.replace('#', '');
    let r = parseInt(col.substring(0, 2), 16);
    let g = parseInt(col.substring(2, 4), 16);
    let b = parseInt(col.substring(4, 6), 16);
    const calc = (c: number) =>
      Math.round(Math.min(Math.max(0, c + c * factor), 255))
        .toString(16)
        .padStart(2, '0');
    return `#${calc(r)}${calc(g)}${calc(b)}`;
  };

  const darkShadow = getLuminance(color, -intensity);
  const lightShadow = getLuminance(color, intensity);

  const shadowStr = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  const insetShadowStr = `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`;

  const background =
    shape === 'concave'
      ? `linear-gradient(145deg, ${darkShadow}, ${lightShadow})`
      : shape === 'convex'
      ? `linear-gradient(145deg, ${lightShadow}, ${darkShadow})`
      : color;

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        width: size,
        height: size,
        borderRadius: radius,
        background,
        boxShadow: shape === 'pressed' ? insetShadowStr : shadowStr,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex items-center justify-center"
    />
  );
};
