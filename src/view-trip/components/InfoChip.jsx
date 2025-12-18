import React from 'react';
import { motion } from 'framer-motion';

function InfoChip({ icon, text }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="
        flex items-center gap-2
        px-4 py-2.5
        bg-white/20 backdrop-blur-md
        border border-white/30
        rounded-full
        text-sm font-medium
        text-white
        select-none
        hover:bg-white/30
        active:scale-95
        transition-all duration-200
        cursor-default
        shadow-lg
      "
    >
      <span className="text-base">{icon}</span>
      <span className="font-semibold">{text}</span>
    </motion.div>
  );
}

export default InfoChip;
