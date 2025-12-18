import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop';

function openInGoogleMaps(name) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  window.open(url, '_blank');
}

function PlaceCard({ time, name, description, travelTime, imageUrl }) {
  return (
    <div className="mb-6">
      {/* Time Slot */}
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-orange-500" />
        <p className="text-orange-500 dark:text-orange-400 font-semibold text-sm">
          {time}
        </p>
      </div>
      
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => openInGoogleMaps(name)}
        className="
          flex
          bg-white/50 dark:bg-white/5
          backdrop-blur-md
          border border-zinc-200 dark:border-white/10
          rounded-2xl
          overflow-hidden
          hover:shadow-xl
          hover:border-zinc-300 dark:hover:border-white/20
          transition-all duration-300
          cursor-pointer
          group
        "
      >
        {/* Image */}
        <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
          <img 
            src={imageUrl || PLACEHOLDER_IMAGE}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/20" />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-center">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {name}
          </h4>
          
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          
          {travelTime && (
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>{travelTime}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default PlaceCard;
