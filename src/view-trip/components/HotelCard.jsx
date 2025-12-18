import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Star } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';

function openInGoogleMaps(name, address) {
  const searchQuery = address 
    ? `${name}, ${address}`
    : name;
  
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  window.open(url, '_blank');
}

function HotelCard({ name, address, price, rating, imageUrl }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openInGoogleMaps(name, address)}
      className="
        bg-white/50 dark:bg-white/5
        backdrop-blur-md
        border border-zinc-200 dark:border-white/10
        rounded-2xl
        overflow-hidden
        cursor-pointer
        hover:shadow-xl
        hover:border-zinc-300 dark:hover:border-white/20
        transition-all duration-300
        group
      "
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={imageUrl || PLACEHOLDER_IMAGE} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4">
            <div className="
              bg-white/20 backdrop-blur-md
              border border-white/30
              rounded-full
              px-3 py-1.5
              flex items-center gap-1.5
            ">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-white font-semibold text-sm">{rating}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {name}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
            <div className="w-8 h-8 bg-zinc-100 dark:bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="text-sm line-clamp-2 flex-1">{address}</p>
          </div>
          
          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
            <div className="w-8 h-8 bg-zinc-100 dark:bg-white/5 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold">{price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HotelCard;
