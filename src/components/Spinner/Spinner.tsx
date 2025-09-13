import { motion } from 'motion/react';

export default function Spinner() {
  return (
    <motion.div
      className="border-t-weather-600 size-5 rounded-full border-2 border-white will-change-transform"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
    />
  );
}
