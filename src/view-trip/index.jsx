import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTripById } from '@/service/firebaseService';
import { Share2, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import InfoChip from './components/InfoChip';
import HotelCard from './components/HotelCard';
import PlaceCard from './components/PlaceCard';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripData = await getTripById(tripId);
        setTrip(tripData);
      } catch (error) {
        console.error('Error fetching trip:', error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-zinc-600 dark:text-zinc-400"
        >
          Loading your adventure...
        </motion.div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl text-zinc-500"
        >
          Trip not found
        </motion.div>
      </div>
    );
  }
  const tripData = trip.tripData || {};
  const userSelection = trip.userSelection || {};
  const { 
    tripDetails = {}, 
    hotelOptions = [], 
    itinerary = [],
    budgetTips = []
  } = tripData;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link', error);
      toast.error('Unable to copy link');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Section with Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative h-[500px] overflow-hidden">
          <img 
            src={PLACEHOLDER_IMAGE}
            alt={tripDetails?.location || userSelection?.location}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          
          {/* Content Over Image */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="px-6 md:px-20 lg:px-44 xl:px-56 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    rounded-full px-4 py-2
                    flex items-center gap-2
                  ">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">
                      {tripDetails?.location || userSelection?.location?.label || 'Your Destination'}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {tripDetails?.location || userSelection?.location?.label || 'Your Trip'}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3">
                  <InfoChip 
                    icon="📅" 
                    text={`${tripDetails?.duration || userSelection?.noOfDays || '?'} Days`} 
                  />
                  <InfoChip 
                    icon="💰" 
                    text={`${tripDetails?.budget || userSelection?.budget || 'Unknown'} Budget`} 
                  />
                  <InfoChip 
                    icon="👥" 
                    text={`${tripDetails?.travelers || userSelection?.traveler || '?'} Travelers`} 
                  />
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Floating Share Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="
              absolute top-6 right-6
              w-12 h-12
              bg-white/10 backdrop-blur-md
              border border-white/20
              text-white rounded-full
              flex items-center justify-center
              hover:bg-white/20
              transition-all duration-200
              shadow-lg
              cursor-pointer
            "
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      <div className="px-6 md:px-20 lg:px-44 xl:px-56 mt-16">
        {/* Hotels Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            Where to Stay
          </h2>
        {hotelOptions?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelOptions.map((hotel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
              <HotelCard 
                name={hotel.name || hotel.hotelName}
                address={hotel.address || hotel.hotelAddress}
                price={hotel.price || hotel.priceRange}
                rating={hotel.rating}
                imageUrl={hotel.imageUrl}
              />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">No hotels available for this trip.</p>
        )}
        </motion.div>

      {/* Itinerary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
          Daily Itinerary
        </h2>
        {itinerary?.map((dayPlan, dayIndex) => (
          <motion.div 
            key={dayIndex} 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + dayIndex * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="
                w-14 h-14 
                bg-linear-to-br from-orange-500 to-pink-500
                rounded-2xl
                flex items-center justify-center
                text-white font-bold text-xl
                shadow-lg
              ">
                {dayPlan.day || dayIndex + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                  Day {dayPlan.day || dayIndex + 1}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {dayPlan.schedule?.length || 0} activities planned
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dayPlan.schedule?.map((place, placeIndex) => (
                <PlaceCard 
                  key={placeIndex}
                  time={place.time || place.timeSlot}
                  name={place.activity || place.placeName || place.name}
                  description={place.details || place.description}
                  travelTime={place.travelTime || place.duration}
                  imageUrl={place.imageUrl}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
      {budgetTips && budgetTips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            Budget Tips
          </h2>
          <div className="
            bg-white/50 dark:bg-white/5
            backdrop-blur-md
            border border-zinc-200 dark:border-white/10
            rounded-3xl
            p-8
            hover:shadow-xl
            hover:border-zinc-300 dark:hover:border-white/20
            transition-all duration-300
          ">
            <ul className="space-y-4">
              {budgetTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300"
                >
                  <span className="text-green-500 flex-shrink-0 mt-0.5 text-lg">✓</span>
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      <footer className="mt-16 py-8 text-center border-t border-zinc-200 dark:border-white/10">
        <p className="text-zinc-400 text-sm">
          Created with AI Travel Planner
        </p>
      </footer>
      </div>
    </div>
  );
}

export default ViewTrip;
